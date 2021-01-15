const fs = require('fs')
const date = require('../data.json')
const { age, data } = require('../utils')


exports.index = function(req, res){
    return res.render("members/index", { member: date.members})
}

exports.create = function(req, res){
    return res.render("members/create")
}

exports.show = function(req,res){
    const { id } = req.params

    const foundMember = date.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send('member not found!')

    
   
    
    const member = {
        ...foundMember,
        age:age(foundMember.birth),
    }

    return res.render("members/show", {member: member})
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
        const id = Number(date.members.length + 1)
        const create_at = Date.now()


        date.members.push({
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
            
            return res.redirect("/members")
        })
       // return res.send(req.body)
        
    }

// edit

exports.edit = function(req, res){
    const { id } = req.params

    const foundMember = date.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send('member not found!') 

    const member = {
        ...foundMember,
        birth: data(foundMember.birth)
    }
   

    return res.render('members/edit', { member })
}

//put

exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundMember = date.members.find(function(member, foundIndex){
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send('member not found!') 

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    date.members[index] = member

    fs.writeFile("data.json", JSON.stringify(date, null, 2), function (err){
        if(err) return res.send("write Erros!")

        return res.redirect(`/members/${id}`)
    })

}

//deletes

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMembers = date.members.filter(function(member){
        return member.id != id
    })

    date.members = filteredMembers

     fs.writeFile("data.json",JSON.stringify(date, null, 2), function(err){
         if (err)return res.send("write fail erro")
         
        return res.redirect("/members")
     })
}