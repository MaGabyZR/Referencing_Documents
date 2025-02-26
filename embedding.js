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
  authors: [authorSchema]                                 //To work with an array of Subdocuments.
  /* author: {                                           //embed the author document directly inside of the course document. It is an embedded or subdocument.
    type: authorSchema,
    required: true
  }       */
}));

async function createCourse(name, authors) {             //rename author to authors to work with the array of Subdocuments.
  const course = new Course({
    name, 
    authors
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

//Add and Author to the array[]
async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

//to remove an Author. In newer versions of Mongoose, .remove() was deprecated
//Use .deleteOne() or .pull() instead of .remove()
async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.deleteOne();
  course.save();
}

removeAuthor('67bf4b1654b42a5081b79b76', '67bf4ca5bb8f610bdb51bc81');
//addAuthor('67bf4b1654b42a5081b79b76', new Author({ name: 'Panzi' }));

/* createCourse('Node Course', [             //To work with an array of Subdocuments. 
  new Author({ name: 'MaGaby' }),
  new Author({ name: 'Monti' })
]); */

//createCourse('Node Course', new Author({ name: 'MaGaby' })); 
//updateAuthor('67bf3ea691e4beef3db00510');