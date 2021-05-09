import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import {AxGetListFiles} from './api.js'

const but1 = 'Student'
function App() {
	const { register, handleSubmit } = useForm()
	const [isStudent, setIsStudent] = useState('Student')

 




	const toggleRole = () => {
		if (isStudent == 'Teacher') {
			setIsStudent('Student')
		} else {
			setIsStudent('Teacher')
		}
	}

  // Render component by roles
	const renderTeacherStudent = () => {
		if (isStudent == 'Teacher') {
			return (
				<div className="column4">
					<h3>See student assignments</h3>
					<div className="GetStudentAssign">
						<input {...register('SubjectID_GetStudent')} placeholder="Enter SubjectID" />
						<br />
						<input {...register('Topic_GetStudent')} placeholder="Enter topic name" />
						<br />
						<input type="submit" />
					</div>
				</div>
			)
		} else {
			return (
				<div className="column3">
					<h3>See lectures & assignments</h3>
					<div className="GetAssign">
						<input {...register('SubjectID_GetAssign')} placeholder="Enter SubjectID" />
						<br />
						<input {...register('MemID_GetAssign')} placeholder="Enter Your ID" />
						<br />
						<input type="submit" />
					</div>
				</div>
			)
		}
	}

  // Handle upload
  const onSubmitUpload = (data) => {
    console.log('onclickUpload')
    if (data.uploadTopic !== '' && data.uploadSubjectID !== '' && data.uploadMemID !== '' && data.uploadFile !== '') {
      console.log(data)
      // calling API
    } 
    
  }

  // Hadnle get all files
  const onSubmitGetFile = async (data) => {
    console.log('onClickGetFiles')
    if (data.getFileSubjectID !== '' && data.getFileMemID !== '') {
      // Callling API getListFiles
      let getData = await AxGetListFiles(data.getFileSubjectID, data.getFileMemID)
      console.log('get Data', getData)
    }


  }
	return (
		<div className="App">
			<div className="role">
				<button onClick={() => toggleRole()}>{isStudent}</button>
			</div>
			<div className="row">
				<div className="column1">
					<div className="Upload">
						<form onSubmit={handleSubmit(onSubmitUpload)}>
							<h3>Upload</h3>
							<input {...register('uploadTopic')} placeholder="Enter topic name" />
							<br />
							<input {...register('uploadSubjectID')} placeholder="Enter SubjectID" />
							<br />
							<input {...register('uploadMemID')} placeholder="Enter Your ID" />
							<br />
							<input  {...register('uploadFile')} type="file" name="picture" />
							<br />
							<input type="submit" />
						</form>
					</div>
				</div>
				<div className="column2">
					<h3>See your file</h3>
					<div className="GetFile">
          <form onSubmit={handleSubmit(onSubmitGetFile)}>

						<input {...register('getFileSubjectID')} placeholder="Enter SubjectID" />
						<br />
						<input {...register('getFileMemID')} placeholder="Enter Your ID" />
						<br />
						<input type="submit" />
          </form>
					</div>

				</div>
			</div>
      {renderTeacherStudent()}
		</div>
	)
}

export default App
