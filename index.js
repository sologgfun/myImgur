const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
let home = new Router()
const fs = require('fs');

app.use(bodyParser());
// app.use(home.routes());
// home.post('/upload', function (req, res) {
//     //接收前台POST过来的base64
//     // ctx.body = "upload";
//     console.log(req.body);
//     var imgData = req.body.imgData;
//     //过滤data:URL
//     var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
//     var dataBuffer = new Buffer(base64Data, 'base64');
//     fs.writeFile("image.png", dataBuffer, function (err) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send("保存成功！");
//         }
//     });
// });
// app.use(home.allowedMethods());
app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        // 当GET请求时候返回表单页面
        let html = `这是一个get请求`;
        ctx.body = html
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
        let postData = ctx.request.body
        var dataBuffer = postData.pic.data;
        // dataBuffer.toString("base64");
        dataBuffer = new Buffer(dataBuffer);
        fs.writeFile("image.png", dataBuffer, function (err) {
            if (err) {
                res.send(err);
            } else {
                console.log("保存成功");
            }
        });
    } else {
        // 其他请求显示404
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
    }
})

app.listen(3000, () => {
    console.log('[demo] request get is starting at port 3000')
})