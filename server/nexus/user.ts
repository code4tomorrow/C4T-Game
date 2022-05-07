import { objectType, mutationType, stringArg, nonNull } from "nexus";
import PasswordUtil from "~~/utils/password";
import { HttpError } from "graphql-helix";
import { setAuthState } from "~~/utils/jwt";
import type { CompatibilityEvent } from "h3";
import { EUserRole } from "../../enums/userRole";

export const User = objectType({
    name: 'User',
    definition(t) {
      t.id("id")
      t.list.field('roles', { type: "String" })
      t.string('email');
      t.string('pass');
      t.string('name');
    }
});

export const Mutation = mutationType({
  definition(t) {
    t.field('createUser', {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        pass: nonNull(stringArg()),
        name: nonNull(stringArg()),
        type: nonNull(stringArg())
      },
      resolve: async (_, { email, pass, name, type }, { prisma }) => {
        if (type !== EUserRole.VOLUNTEER && type !== EUserRole.PROJECT_LEAD) {
          throw new HttpError(400, "Invalid role!");
        }

        const hash = await PasswordUtil.hash(pass);
        const res = await prisma.user.create({
          data: { email, pass: hash, name, roles: [ type ]}
        });
        return res; 
      }
    })
  
    t.field('loginClient', {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        pass: nonNull(stringArg()),
        type: nonNull(stringArg())
      },
      resolve: async (_root, { email, pass, type }, { prisma, res }) => {
        const user = await prisma.user.findFirst({
          where: { email, roles: { has: type }}
        })

        if (!user) throw new HttpError(403, "Login failed, user doesn't exist!");

        if (await PasswordUtil.compare(pass, user.pass)) {
          setAuthState(user, res as unknown as CompatibilityEvent);
          return user; 
        } else {
          throw new HttpError(403, "Login failed, invalid email or password.");
        }
      }
    })
  }
})