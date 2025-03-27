import React from 'react'
import ProgressBoard from "./progress-board";


export default function ProgressColumn() {
    const columnTitles = ["To Do", "In Progress", "Done"];
    return (
        <div className="mx-4 mb-4 mt-0 h-[97%]">
            <ProgressBoard columns={columnTitles} />
        </div>
    )
}
