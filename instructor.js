const fs = require('fs')
const date = require('./data.json')
const { age, data } = require('./utils')


exports.index = function(req, res){
    return res.render("instructors/index", { instructor: date.instructors})
}

exports.show = function(req,res){
    const { id } = req.params

    const foundInstructor = date.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send('instructor not found!')

    
   
    
    const instructor = {
        ...foundInstructor,
        age:age(foundInstructor.birth),
        services:foundInstructor.services.split(","),
        create_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.create_at),
    }

    return res.render("instructors/show", {instructor: instructor})
}

// create
exports.post = function(req,res){
        
    const keys = Object.keys(req.body)
            
        for (key of keys){
                
            if(req.body[key] == "")
            return res.send('please. Fill all fields.')
            
        }
        
        //Destruturar o obejto
        let { avatar_url, birth ,name ,gender ,services  } = req.body

        birth = Date.parse(req.body.birth)
        const id = Number(date.instructors.length + 1)
        const create_at = Date.now()


        date.instructors.push({
            id,
            avatar_url,
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

// edit

exports.edit = function(req, res){
    const { id } = req.params

    const foundInstructor = date.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send('instructor not found!') 

    const instructor = {
        ...foundInstructor,
        birth: data(foundInstructor.birth)
    }
   

    return res.render('instructors/edit', { instructor })
}

//put

exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundInstructor = date.instructors.find(function(instructor, foundIndex){
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send('instructor not found!') 

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    date.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(date, null, 2), function (err){
        if(err) return res.send("write Erros!")

        return res.redirect(`/instructors/${id}`)
    })

}

//deletes

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructors = date.instructors.filter(function(instructor){
        return instructor.id != id
    })

    date.instructors = filteredInstructors

     fs.writeFile("data.json",JSON.stringify(date, null, 2), function(err){
         if (err)return res.send("write fail erro")
         
        return res.redirect("/instructors")
     })
}