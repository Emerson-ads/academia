const fs = require('fs')
const date = require('./data.json')

exports.show = function(req,res){
    const { id } = req.params

    const foundInstructor = date.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send('instructor not found!')

    return res.send(foundInstructor)
}

// create
exports.post = function(req,res){
        
    const keys = Object.keys(req.body)
            
        for (key of keys){
                
            if(req.body[key] == "")
            return res.send('please. Fill all fields.')
            
        }
        
        //Destruturar o obejto
        let { avartar_url, birth ,name ,gender ,services  } = req.body

        birth = Date.parse(req.body.birth)
        const id = Number(date.instructors.length + 1)
        const create_at = Date.now()


        date.instructors.push({
            id,
            avartar_url,
            name,
            birth,
            gender,
            services,
            create_at,
        })

        fs.writeFile("data.json",JSON.stringify(date,null,2), function(err){
            if(err) return res.send("erro writeFile")
            
            return res.redirect("/instructors")
        })
       // return res.send(req.body)
        
    }

// update

//delete