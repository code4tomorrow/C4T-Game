import cors from "cors";

export default defineEventHandler(({ req, res }) => {
    if (/api\/graphql$/.test(req.url)) {
        const enableCors = cors({ 
            methods: "POST",
            origin: true,
        })   
        enableCors(req, res, () : void => {});
    }
})