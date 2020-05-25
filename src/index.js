import React, { useState, useEffect } from 'react';
import './css/JSONPreviewer.css'


const JSONPreviewer = (props)=>  {

    const [expanded, setExpanded] = useState(props.expanded || false);

    const validSourceObj = (props.sourceObject && props.sourceObject !== undefined);
    const displayType = props.displayType || true;
    const previewTitle =  props.previewTitle || 'JSONPreviewer';
    const stringDisplayLimit = props.stringDisplayLimit || 1024;

    const flattenArrays = props.flattenArrays !== undefined ? props.flattenArrays : true; //default true

    console.log('props check', props);

    useEffect(()=>{


    }, [props.sourceObject])


    const preview = sourceObj => {

        return getPreviewDetailed(0, sourceObj);

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
        const targetObjectType = getType(targetObject);
        const isArray = targetObjectType === 'array';

        const render = keys.map((key, index)=>  {

            const sectionClass = index % 2 ? 'section' : 'section alt'

            //todo: combine with with the standard key labeling below
            if(!targetObject[key] || targetObject[key] === 'undefined') {

                let label = key;
                let str = '(undefined)';
                if(targetObject[key] === null) {
                    str = '(null)';
                }

                return(

                    <div className={ sectionClass } key={index}>
                    <div><span className="object-key"> {label} :</span> <span className="data">{str}</span></div>
                    </div>

                )


            }


            if(typeof targetObject[key] === 'function') { return; }


            const shouldNest = shouldNestObject(targetObject[key]);

            if(shouldNest) {

                const keyLabel = isArray ? `[${key}]` : key;

                return (



                    <div className="toggle-wrap" key={index} >
                    <div className="label-wrap"> {keyLabel} <span className="object-key source">{`(${typeLabel(targetObject[key])})`}:</span></div>
                    { getPreviewDetailed(indent+1, targetObject[key])}
                    </div>

                )
            }

            else {

                let str = JSON.stringify(targetObject[key], null).replace(key, '');
                const type = getType(targetObject[key]);
                let dataSuffix = null;

                if(type === 'string' && stringDisplayLimit !== -1 && str.length > stringDisplayLimit) {
                    const strLength = str.length;
                    str = `${str.substring(0, stringDisplayLimit)}...`;
                    dataSuffix = ( <span className="dataSuffix">[{strLength} characters]</span> );
                }

                let label = isArray ? `[${key}]` : key;


                if(displayType) {
                    label = `${label } (${ typeLabel(targetObject[key]) })`;
                }

                if(str) {

                    return(
                        <div className={sectionClass } key={index}>
                        <div><span className="object-key"> {label} :</span> <span className="data">{str}</span> {dataSuffix}</div>
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

        if(Array.isArray(targetObject)) {

            //console.log('flattenArrays', { flattenArrays, propsVersion:props.flattenArrays});

            if(flattenArrays === false) {
                return true;
            }
            else {
                return false;
            }

        }

        if(typeof targetObject === 'object') { return true; }

        return false;


    }

    const getType = item =>   {

        if(Array.isArray(item)) return 'array';
        if(typeof item === 'object') return 'object';
        if(typeof item === 'string') return 'string';
        if(typeof item === 'number') return 'number';
        if(typeof item === 'boolean') return 'boolean';

    }

    const typeLabel = (sourceObj)=>  {

        if(sourceObj === undefined) return '(undefined)';
        if(sourceObj === null) return '(null)';

        const type = getType(sourceObj);
        let label = type;

        if(type === 'array') {
            label = `${type}[${sourceObj.length}]`;
        }
        return label;

    }


    return(
        <div onClick={()=> { setExpanded(!expanded)}}>

        {!validSourceObj && (

            <div className="JSONPreviewer">
            <div className="label-wrap">🔍 { `${getPreviewTitle()} `} <span className="object-key source"> {typeLabel(props.sourceObject)}</span></div>
            </div>
        )}

        {validSourceObj && !expanded && (
            <div className="JSONPreviewer">
            <div className="label-wrap">🔍 { `${getPreviewTitle()} `} <span className="object-key source"> {typeLabel(props.sourceObject)}</span><div className="arrow">▼</div> </div>
            </div>
        )}
        {validSourceObj && expanded && (
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