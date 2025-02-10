import {ArrowLeft, Edit, PlusCircle} from "lucide-react";
import {Link} from "react-router-dom";
import React from "react";

export const PageHeader: React.FC<{
    title: string,
    backUrl?: string,
    createUrl?: string,
    editUrl?: string,
}> = ({title, backUrl, createUrl, editUrl}) => (
    <div className="flex items-center mb-8 gap-4">
        <h1 className="text-3xl flex-grow text-purple-900">{title}</h1>

        {createUrl && (
            <Link to={createUrl} className="
                flex items-center gap-2 rounded-sm py-2 px-4 font-medium
                bg-purple-800 text-white">
                <PlusCircle size={25}/>
            </Link>
        )}

        {backUrl && (
            <Link to={backUrl} className="
                flex items-center gap-2 rounded-sm py-2 px-4 font-medium
                bg-purple-800 text-white">
                <ArrowLeft size={25}/>
            </Link>
        )}

        {editUrl && (
            <Link to={editUrl} className="
                flex items-center gap-2 rounded-sm py-2 px-4 font-medium
                bg-purple-800 text-white">
                <Edit size={25}/>
            </Link>
        )}
    </div>
)
