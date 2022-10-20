const Config = require('../config/config');
let render_list;

class Profiler{
    constructor(){
        this.status = Config.get_enable_profiler();
    }
    
    get_information(req, res, next){
        render_list = {
            post: JSON.stringify(req.body),
            session: JSON.stringify(req.session),
        };
        next();
    }

    render(){
        if(this.status == "1"){
            let hold = `<div style="border: 1px solid black; padding: 5px; margin: 50px 0px; word-wrap: break-word;"><p>post: ${render_list.post}</p><p>session: ${render_list.session}</p><p>Query:</p></div>`;
            return hold;
        }
        else{
            return "Profiler is disabled";
        }
    }
}
const profiler = new Profiler();
module.exports = profiler;