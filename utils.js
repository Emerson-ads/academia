module.exports = {
    age : function age (timestamp){
        const today = new Date()
        const birthday = new Date(timestamp)
        
        let age = today.getFullYear() - birthday.getFullYear()
    
        const moth = today.getMonth() - birthday.getMonth()
    
        
        
    
        if(moth <0 || moth == 0 && today.getDate() < birthday.getDate()){
            age = age -1
        }
    
        return age
    },
    data: function(timestamp){
        const date = new Date(timestamp)

        // yyyy
        const year = date.getUTCFullYear()

        //mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        //dd

        const day = `${date.getUTCDate()}`.slice(-2)

        return (`${year}-${month}-${day}`)
    } 
} 