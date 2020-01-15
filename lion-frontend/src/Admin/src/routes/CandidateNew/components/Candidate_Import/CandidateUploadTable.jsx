import FormatTable from '../../../../common/Table'
import React from 'react'

const candidateUploadTable = props => {
    if (props.data) {
        return (
            <div>
                <FormatTable
                    data={props.data}
                    headers={[
                        { name: "First name", prop: "firstName", search: true },
                        { name: "Last name", prop: "lastName", search: true },
                        { name: "Email", prop: "email", search: true },
                        { name: "Mobile", prop: "mobile", search: true },
                        { name: "University", prop: "university", search: true },
                        { name: "Note", prop: "note", search: false },
                        { name: "State", prop: "state", search: true }
                    ]}
                />
            </div>
        )
    }
}
export default candidateUploadTable;