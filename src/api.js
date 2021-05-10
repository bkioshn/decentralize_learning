import axios from 'axios'
import { useState, useEffect } from 'react'

// const instance = axios.create({
// 	baseURL: 'http://localhost:8084/getListFiles/?subjectID=CSS431&memberID=6122770215',
// 	withCredentials: false,
// 	headers: {
// 		'Access-Control-Allow-Origin': '*',
// 		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
// 	},
// })
const ax = axios.create({
	baseURL: 'http://localhost:8080/',
	headers: {
		'Content-type': 'application/json',
	},
})

// Should be lowercase getListFiles
const getListFiles = (subjectID, memberID) => {
	console.log(subjectID)
	let params = {
		subjectID: subjectID,
		memberID: memberID,
	}
	return ax.get('/getListFiles/', {params})
		.then((response) => {
			console.log(response.data.args)
			console.log('response: ', response)
			console.log(JSON.stringify(response.data))
			return(response.data)
		})
		.catch((err) => {
			console.error(err)
		})
}
const getLectureAssignmentStudent = (subjectID  , memberID) => {
	console.log(subjectID)
	console.log(memberID)
	let params = {
		subjectID : subjectID,
		
		memberID : memberID
	}
	return ax.get('/getLectureAssignmentStudent/', {params})
		.then((response) => {
			console.log(response.data.args)
			console.log('response:', response)
			console.log(JSON.stringify(response.data))
		})
		.catch((err) => {
			console.error(err)
		})
}
const getAssignmentTeacher = (subjectID, topic) => {
	console.log(subjectID)
	console.log(topic)
	let params = {
		subjectID : subjectID,
		
		topic : topic
	}
	return ax.get('/getAssignmentTeacher/', {params})
		.then((response) => {
			console.log(response.data.args)
			console.log('response:', response)
			console.log(JSON.stringify(response.data))
		})
		.catch((err) => {
			console.error(err)
		})
}
 const Upload = () => {
 	const [upload, setUpload] = useState({})
 	axios
 		.post('http://localhost:8080/upload', { topic: '', fileName: '', subjectID: '',memberID:''})
 		.then((response) => {
 			console.log('response:', response)
 			setUpload(JSON.stringify(response.data))
 			console.log(upload)
 			return upload
 		})
 		.catch((err) => {
 			console.error(err)
 		})
 }

// const AxGetLectureAssignmentStudent = () => {
// 	const [lectureAssignment, setLectureAssignment] = useState({})
// 	axios
// 		.get('http://localhost:8084/getLectureAssignmentStudent?subjectID=CSS431&isAssignment=1&memberID=6122770215')
// 		.then((response) => {
// 			console.log('response: ', response)
// 			setLectureAssignment(JSON.stringify(response.data))
// 			console.log(lectureAssignment)
// 			return lectureAssignment
// 		})
// 		.catch((err) => {
// 			console.error(err)
// 		})
// }
// const AxGetAssignmentTeacher = () => {
// 	const [assignmentTeacher, setAssignmentTeacher] = useState({})
// 	axios
// 		.get('http://localhost:8084/getAssignmentTeacher?subjectID=CSS431&topic=TestAs&isAssignment=1')
// 		.then((response) => {
// 			console.log('response: ', response)
// 			setAssignmentTeacher(JSON.stringify(response.data))
// 			console.log(assignmentTeacher)
// 			return assignmentTeacher
// 		})
// 		.catch((err) => {
// 			console.error(err)
// 		})
// }

// const AxUpload = () => {
// 	const [upload, setUpload] = useState({})
// 	axios
// 		.post('http://localhost:8084/upload', { topic: 'test31', fileName: 'Anessa' })
// 		.then((response) => {
// 			console.log('response:', response)
// 			setUpload(JSON.stringify(response.data))
// 			console.log(upload)
// 			return upload
// 		})
// 		.catch((err) => {
// 			console.error(err)
// 		})
// }

export { getListFiles, getLectureAssignmentStudent, getAssignmentTeacher, Upload }
