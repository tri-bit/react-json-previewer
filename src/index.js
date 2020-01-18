import React, { useState, useEffect } from 'react';
import './css/JSONPreviewer.css'


const JSONPreviewer = (props)=>  {

    const [expanded, setExpanded] = useState(props.expanded || false);

    const displayType = props.displayType || true;
    const previewTitle =  props.previewTitle || 'JSONPreviewer';
    const previewType = props.basicPreview ? 'basic' : 'detailed';

    useEffect(()=>{


    }, [props.sourceObject])


    const preview = sourceObj => {

        if(previewType === 'basic') {
            return getPreviewBasic(sourceObj)
        } else {
            return getPreviewDetailed(0, sourceObj);
        }

    }

    /*
    const getPreviewBasic = (sourceObj)=>  {

        return(
            <div style={{padding:10}}>
                <pre>
                {JSON.stringify(sourceObj, null, 2)}
                </pre>
            </div>
        )

    }
    */

    const getPreviewDetailed = (indent, targetObject)=> {

        //const { sourceObject } = props;

        const keys = Object.keys(targetObject);

        const render = keys.map((key, index)=>  {

            if(typeof targetObject[key] === 'function') { return; }

            const sectionClass = index % 2 ? 'section' : 'section alt'
            const shouldNest = shouldNestObject(targetObject[key]);

            if(shouldNest) {
                return (



                    <div className="toggle-wrap" key={index} >
                    <div className="label-wrap">{key} <span className="object-key source">{`(${typeLabel(targetObject[key])})`}:</span></div>
                    { getPreviewDetailed(indent+1, targetObject[key])}
                    </div>

                )
            }

            else {

                const str = JSON.stringify(targetObject[key], null);
                let label = key;
                if(displayType) {
                    label = `${label } (${ typeLabel(targetObject[key]) })`;
                }

                if(str) {

                    return(
                        <div className={sectionClass } key={index}>
                        <div><span className="object-key"> {label} :</span> {JSON.stringify(targetObject[key], null).replace(key, '')}</div>
                        </div>
                    )
                } else {
                    return <div>{key}undefined error</div>
                }

            }

        })

        return(

        <>{render}</>

        )

    }


    const getPreviewTitle = ()=> props.previewTitle || 'JSONPreviewer';

    const shouldNestObject = (targetObject)=>   {

        let shouldNest = false;

        //todo: more detailed nest logic
        return typeof targetObject === 'object' && !Array.isArray(targetObject);


    }

    const getType = item =>   {

        if(Array.isArray(item)) return 'array';
        if(typeof item === 'object') return 'object';
        if(typeof item === 'string') return 'string';
        if(typeof item === 'number') return 'number';
        if(typeof item === 'boolean') return 'boolean';

    }

    const typeLabel = (sourceObj)=>  {

        const type = getType(sourceObj);
        let label = type;

        if(type === 'array') {
            label = `${type}[${sourceObj.length}]`;
        }
        return label;

    }


    return(
        <div onClick={()=> { setExpanded(!expanded)}}>
        {!expanded && (
            <div className="JSONPreviewer">
            <div className="label-wrap">🔍 { `${getPreviewTitle()} `} <span className="object-key source"> {typeLabel(props.sourceObject)}</span><div className="arrow">▼</div> </div>
            </div>
        )}
        {expanded && (
            <div className="JSONPreviewer open">
                <div className="label-wrap">🔍 { `${getPreviewTitle()}`} <span className="object-key source"> {typeLabel(props.sourceObject)}</span><div className="arrow">▲</div></div>
                {props.sourceObject && (
                    <>
                    { preview(props.sourceObject) }
                    </>
                )}
            </div>
        )}

        </div>
    )

}


export default JSONPreviewer;