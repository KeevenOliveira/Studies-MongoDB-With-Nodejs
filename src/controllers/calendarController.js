const Calendar = require('../models/Calendar');

const getTasks = async (request, response) => {
    try {
        const calendars = await Calendar.find({}, (err, calendars)=>{
            if(err){
                return response.status(400).json({ 
                    success: false,
                    error: err,
                });
            };
            if(!calendars.length){
                return response.status(404).json({
                    success: false, 
                    error: 'Calendars not found'
                });
            };
        });
        response.status(200).json({
            success: true,
            data: calendars,    
        });

    } catch (error) {
        response.send(error);
    }
}

const createTask = async (request, response) => {

    const body = (request.body);
        if(!body){
            return response.status(400).json({
                success: false,
                error: 'You must a task'
            });
        }

    try {
        
       const task = new Calendar(body);

       if(!task){
           return response.status(400).json({
               success: false,
               error: err
           });
       }
       await task.save().then(()=>{
           return response.status(201).json({
               success: true,
               id: task._id,
               message: 'Task Created!',
           });
       })

    } catch (err) {
        return response.status(400).json({
            err,
            message: 'Task not created',
        })   
    }
}

const updateTask = async (request, response) => {
    const body = request.body;
    try {
        if(!body){
            return response.status(400).json({
                err,
                message: 'Task not found',
            })
        }
        await Calendar.findOne({ _id: request.params.id}, (err, calendar) => {
            if(err){
                return response.status(404).json({
                    err,
                    messange: 'Task not found!',
                })
            }
            calendar.task = body.task
            calendar.save().then(()=>{
                return response.status(200).json({
                    success: true,
                    id: body._id,
                    message: 'Task Updated'
                })
            })
        })
    } catch (error) {
        response.status(404).json({
            error, message: 'Update error',
        })
    }
}

const deleteTask = async (request, response) => {
    try {
        await Calendar.findOneAndDelete({ _id:request.params.id}, (err, calendar) => {
            if(err){
                return response.status(400).json({ 
                    success: false, 
                    error: err,
                })
            }
            if(!calendar){
                return response.status(404).json({
                    success: false,
                    error: 'Task not found!',
                });
            }
            return response.status(200).json({
                success: true,
                data: calendar,
            })
        })
    } catch (error) {
        console.log(error);
    }
}

const getTaskById = async (request, response)=>{
    try {
        await Calendar.findOne({ _id: request.params.id}, (err, calendar)=>{
            if(err){
                console.log(err)
                return response.status(400).json({
                    success: false,
                    error: err,
                    message: 'I found one error',
                })
            }

            if(!calendar){
                console.log(calendar)
                return response.status(404).json({
                    success: false,
                    error: 'Calendar not found!'
                })
            }
            return response.status(200).json({
                success: true,
                data: calendar,
            })
        })
    } catch (error) {
        return response.status(400).json({
            success: false,
            error: error,
            message: 'Get task error'
        })
    }
}

module.exports = { createTask, getTasks, updateTask, deleteTask, getTaskById };