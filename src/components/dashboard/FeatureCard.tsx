import Link from 'next/link';
import React from 'react';

interface FeatureCardProps {
    key: number;
    title: string;
    description: string;
    btnOne: string;
    btnTwo: string;
    routeOne: string;
}

const FeatureCard: React.FC<FeatureCardProps> = (props) => {
    return (
        <div className="column2" key={props.key}>
            <div className="content">
                <div>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="circle1">
                    <div className="circle2">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="logo1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"></path></svg>
                    </div>
                </div>
            </div>
            <div className="links">
                <div><Link href={props.routeOne}>{props.btnOne}<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></Link></div>
                <div><a href="#">{props.btnTwo} <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg></a></div>
            </div>
        </div>
    )
}

export default FeatureCard;
