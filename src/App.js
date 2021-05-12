import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import { getListFiles, getLectureAssignmentStudent, getAssignmentTeacher, upload } from './api.js'

function App() {
	const { register, handleSubmit } = useForm()
	const [isStudent, setIsStudent] = useState('Student')
	const [listFiles, setListFiles] = useState()
	const [studentAssignments, setStudentAssignment] = useState()
	const [teacherFiles, setTeacherFiles] = useState()
	const [uploadSuccess, setUploadSuccess] = useState()
	const toggleRole = () => {
		if (isStudent === 'Teacher') {
			setIsStudent('Student')
		} else {
			setIsStudent('Teacher')
		}
	}

	// Handle upload
	const onSubmitUpload = async (data) => {
		console.log('onclickUpload')
		if (
			data.uploadTopic !== '' &&
			data.uploadSubjectID !== '' &&
			data.uploadMemID !== '' &&
			data.file !== ''
		) {
			console.log(data)
			// calling API
			let getUpload
			if (isStudent === 'Student') {
				// Mock up fileName'
				console.log('Student')
				getUpload = await upload(data.uploadSubjectID, data.uploadTopic, data.uploadMemID, data.file[0], 'student', '1','')
			} else {
				if (data.fileType === 'assignment' ) {
					console.log('Teacher Assignment')
					getUpload = await upload(data.uploadSubjectID, data.uploadTopic, data.uploadMemID, data.file[0], 'teacher', '1','')
				} else {
					console.log('Teacher Lecture')
					console.log(data.file[0])
					getUpload = await upload(data.uploadSubjectID, data.uploadTopic, data.uploadMemID, data.file[0], 'teacher', '0','')
				}
			}
			if (getUpload.message === 'Success') {
				setUploadSuccess(getUpload)
			} else {
				setUploadSuccess({'message': 'Something went wrong, please try again', hash: ''})
			}
		}
	}

	// Hadnle get all files
	const onSubmitGetFile = async (data) => {
		console.log('onClickGetFiles')
		if (data.getFileSubjectID !== '' && data.getFileMemID !== '') {
			// Callling API getListFiles
			let getData = await getListFiles(data.getFileSubjectID, data.getFileMemID)
			setListFiles(getData)
			console.log('get Data', getData)
		}
	}
	const onSubmitGetLectureAssignmentStudent = async (data) => {
		console.log('onClickGetStudent')
		if (data.SubjectID_GetAssign !== '' && data.MemID_GetAssign !== '') {
			let getData = await getLectureAssignmentStudent(data.SubjectID_GetAssign)
			console.log('get Data', getData)
			setTeacherFiles(getData)
		}
	}
	const onSubmitGetAssignmentTeacher = async (data) => {
		console.log('OnclickGetTeacher')
		if (data.SubjectID_GetStudent !== '' && data.Topic_GetStudent !== '') {
			let getData = await getAssignmentTeacher(data.SubjectID_GetStudent, data.Topic_GetStudent)
			console.log('get Data', getData)
			setStudentAssignment(getData)
		}
	}
	// Render value from upload
	const renderUpload = () => {
		console.log('upload success ', uploadSuccess)
		if (uploadSuccess) {
			return <div>
				<span>{uploadSuccess.message}</span>
				<br/>
				<a href={'https://ipfs.io/ipfs/' + uploadSuccess.hash}>{'https://ipfs.io/ipfs/' + uploadSuccess.hash}</a>

				<span>{}</span>

			</div>
		}
	}
	// Render value from getListFiles
	const renderListFiles = () => {
		if (listFiles) {
			console.log('render list file is called', listFiles)
			let list = []
			for (const x in listFiles) {
				console.log(listFiles[x])
				list.push(
					<div>
						<span>{listFiles[x].subjectID}</span>
						<br />
						<span>{listFiles[x].topic}</span>
						<br />
						<a href={'https://ipfs.io/ipfs/' + listFiles[x].hash}>{'https://ipfs.io/ipfs/' + listFiles[x].hash}</a>
					</div>
				)
			}
			console.log(list)
			return <div>{list}</div>
		}
	}

	const renderstudentAssignment = () => {
		if (studentAssignments) {
			console.log('render list file is called', studentAssignments)
			let list = []
			for (const x in studentAssignments) {
				console.log(studentAssignments[x])
				list.push(
					<div>
						<span>{studentAssignments[x].subjectID}</span>
						<br />
						<span>{studentAssignments[x].memberID}</span>
						<br />
						<a href={'https://ipfs.io/ipfs/' + studentAssignments[x].hash}>{'https://ipfs.io/ipfs/' + studentAssignments[x].hash}</a>
					</div>
				)
			}
			console.log(list)
			return <div>{list}</div>
		}
	}

	const renderteacherFiles = () => {
		if (teacherFiles) {
			console.log('render list file is called', teacherFiles)
			let list = []
			console.log('teacher files ', teacherFiles)
			for (const x in teacherFiles) {
				console.log(teacherFiles[x])
				list.push(
					<div>
						<span>{teacherFiles[x].subjectID}</span>
						<br />
						<span>{teacherFiles[x].topic}</span>
						<br />
						<a href={'https://ipfs.io/ipfs/' + teacherFiles[x].hash}>{'https://ipfs.io/ipfs/' + teacherFiles[x].hash}</a>
					</div>
				)
			}
			console.log(list)
			return <div>{list}</div>
		}
	}
	// Render component by roles
	const renderTeacherStudent = () => {
		if (isStudent === 'Teacher') {
			return (
				<div className="column">
					<div className="inputCard">
						<form onSubmit={handleSubmit(onSubmitGetAssignmentTeacher)}>
							<h3>See student assignments</h3>
							<input {...register('SubjectID_GetStudent')} placeholder="Enter SubjectID" />
							<br />
							<input {...register('Topic_GetStudent')} placeholder="Enter topic name" />
							<br />
							<input type="submit" />
						</form>
					</div>
					<div className="display">{renderstudentAssignment()}</div>

				</div>
			)
		} else {
			return (
				<div className="column">
					<div className="inputCard">
						<form onSubmit={handleSubmit(onSubmitGetLectureAssignmentStudent)}>
							<h3>See lectures & assignments</h3>
							<input {...register('SubjectID_GetAssign')} placeholder="Enter SubjectID" />
							<br />
							<input {...register('MemID_GetAssign')} placeholder="Enter Your ID" />
							<br />
							<input type="submit" />
						</form>
					</div>
					<div className="display">{renderteacherFiles()}</div>

				</div>
			)
		}
	}

	return (
		<div className="App">
			<div className="role">
				<button onClick={() => toggleRole()}>{isStudent}</button>
			</div>
			<div className="row">
				<div className="column">
					<div className="inputCard">
						<form onSubmit={handleSubmit(onSubmitUpload)}>
							<h3>Upload</h3>
							<input {...register('uploadTopic')} placeholder="Enter topic name" />
							<br />
							<input {...register('uploadSubjectID')} placeholder="Enter SubjectID" />
							<br />
							<input {...register('uploadMemID')} placeholder="Enter Your ID" />
							<br />
							
							<select {...register("fileType")}>
								<option value="assignment">Assignment</option>
								<option value="lecture">Lecture</option>
							</select>
							<br/>
							<input {...register('file')} type="file" name="file" />
							<br />
							<input type="submit" />
						</form>
					</div>
					<div className="display">{renderUpload()}</div>
				</div>
				{/* List files */}
				<div className="column">
					<div className="inputCard">
						<form onSubmit={handleSubmit(onSubmitGetFile)}>
							<h3>See your file</h3>
							<input {...register('getFileSubjectID')} placeholder="Enter SubjectID" />
							<br />
							<input {...register('getFileMemID')} placeholder="Enter Your ID" />
							<br />
							<input type="submit" />
						</form>
					</div>
					<div className="display">{renderListFiles()}</div>
				</div>
			{renderTeacherStudent()}
			</div>
		</div>
	)
}

export default App
