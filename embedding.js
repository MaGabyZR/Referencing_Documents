const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {                                           //embed the author document directly inside of the course document. It is an embedded or subdocument.
    type: authorSchema,
    required: true
  }      
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
  const course = await Course.findById(courseId);                
  course.author.name = 'MaGaby Rubio';
  course.save();
}
//You can update it directly and save it. 
// But .update() is no longer supported in Mongoose. 
// It was deprecated in favor of .updateOne(), .updateMany(), or .findOneAndUpdate(). 

//createCourse('Node Course', new Author({ name: 'MaGaby' })); 
updateAuthor('67bf3ea691e4beef3db00510');