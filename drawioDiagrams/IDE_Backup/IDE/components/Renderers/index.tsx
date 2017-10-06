import * as React from 'react';
import { TextRenderer } from './TextRenderer';

const Renderers = {};
Renderers[TextRenderer.name] = (data: any) => { return (<TextRenderer text={data}/>) }

export {
    Renderers
}