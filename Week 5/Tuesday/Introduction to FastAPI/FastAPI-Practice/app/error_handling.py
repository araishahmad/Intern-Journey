from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

class Marks_Submission(BaseModel):
    name: str
    roll_no: int
    subject: str
    marks: int
    grade: str

app = FastAPI()

record = []

@app.get('/')
@app.get('/home')
def get_student_details():
    return {
        'Records': record
    }

@app.post('/submission')
def submit_marks(marks_submission: Marks_Submission):
    if marks_submission.marks > 100 or marks_submission.marks < 0:
        raise HTTPException(
            status_code=400,
            detail={
                'error': 'Invalid marks, out of bounds',
                'marks': marks_submission.marks
            }
        )

    if marks_submission.subject.strip() == '':
        raise HTTPException(
            status_code=400,
            detail={
                'error': 'No subject name entered',
                'subject_name': marks_submission.subject,
                'fix': 'Please enter a valid subject name'
            }
        )

    record.append({
        'name': marks_submission.name,
        'roll_no': marks_submission.roll_no,
        'subject': marks_submission.subject,
        'marks': marks_submission.marks,
        'grade': marks_submission.grade
    })

    return {
        'message': 'Marks submitted successfully',
        'name': marks_submission.name,
        'roll_no': marks_submission.roll_no,
        'subject': marks_submission.subject,
        'marks': marks_submission.marks,
        'grade': marks_submission.grade
    }

@app.get('/fetch')
def fetch_students(grade: str = None, min_marks: int = None, limit: int = None):
    filtered = []

    for student in record:
        if grade and student['grade'] != grade:
            continue

        if min_marks and student['marks'] < min_marks:
            continue

        filtered.append(student)

    return filtered[:limit]

@app.put('/update/{roll_no}')
def update_marks(roll_no: int, updated_info: Marks_Submission):
    for student in record:
        if student['roll_no'] == roll_no:
            if updated_info.marks < 0 or updated_info.marks > 100:
                raise HTTPException(
                    status_code=400,
                    detail={
                        'error': 'Invalid marks, enter marks in bounds',
                        'marks': updated_info.marks,
                        'fix': 'Enter marks between 0 and 100'
                    }
                )

            student['name'] = updated_info.name
            student['subject'] = updated_info.subject
            student['marks'] = updated_info.marks
            student['grade'] = updated_info.grade

            return {
                'message': f'Marks updated successfully for roll_no {roll_no}',
                'name': student['name'],
                'subject': student['subject'],
                'marks': student['marks'],
                'grade': student['grade']
            }

    raise HTTPException(
        status_code=404,
        detail={
            'error': f'No student exists with roll_no {roll_no}',
            'roll_no': roll_no,
            'fix': 'Use a roll no of enrolled student'
        }
    )

@app.delete('/delete/{roll_no}')
def delete_student(roll_no: int):
    if not any(student['roll_no'] == roll_no for student in record):
        raise HTTPException(
            status_code=404,
            detail={
                'error': f'No student exists with roll_no {roll_no}',
                'roll_no': roll_no,
                'fix': 'Use a roll no of enrolled student'
            }
        )

    for student in record:
        if student['roll_no'] == roll_no:
            record.remove(student)
            break

    return {'message': f'Student with roll_no {roll_no} removed successfully'}