// Load the 'Student' Mongoose model
const Student = require('mongoose').model('Student');




exports.displayPage = function (req, res) {
  
    var session = req.session;
    res.render('register', {
      errAdd: []
  });
};


exports.create = function(req, res, next) {
 
  var session = req.session;
	const student = new Student(req.body);
  student.save((err) => {
    if(err)
    {
        var errAdd = [];
        for (field in err.errors) {
            errAdd.push(err.errors[field].message); 
            console.log(errAdd);
        }
        res.render('register', {
          errAdd: errAdd
        });
        
        //res.json(err);
    }else {
  
        session.student = student
        res.render("display", {
          studentObj: session.student,
          titlePage: "Student Comment",
        });
      }
});
};

