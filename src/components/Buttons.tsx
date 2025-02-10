import {Link} from "react-router-dom";
import {Eye, Edit} from 'lucide-react';
import React from "react";

export const ViewButton: React.FC<{ to: string }> = (props) => (
    <Link {...props} className="rounded-sm bg-purple-800 text-white px-4 py-2">
        <Eye size={18}/>
    </Link>
)

export const EditButton: React.FC<{ to: string }> = (props) => (
    <Link {...props} className="rounded-sm bg-purple-800 text-white px-4 py-2">
        <Edit size={18}/>
    </Link>
)
