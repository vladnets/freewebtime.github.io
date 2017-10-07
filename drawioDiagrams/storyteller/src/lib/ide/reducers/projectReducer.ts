import { IPayloadCreateProject } from '../actions/payloads/IPayloadCreateProject';
import { IProject } from '../appData/IProject';
import * as ActionTypes from '../actions/actionTypes';

export default function (state: IProject, action: { type: string, payload: any }) {
    switch (action.type) {
        
        case ActionTypes.PROJECT_CREATE:
            const payload = action.payload as IPayloadCreateProject;
            if (payload)
            {
                const template = payload.templates[payload.templateName];
                if (template)
                {
                    return {
                        ...template,
                        Name: payload.name,
                    }
                }
            }
            return { ...state };

        case ActionTypes.PROJECT_CHANGE_NAME:
            return {
                ...state,
                Name: action.payload
            }

        default:
            return {...state}
    }
}