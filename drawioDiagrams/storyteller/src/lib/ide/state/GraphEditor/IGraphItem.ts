export interface IGraphItem {
    Id: string,
    Renderers: Map<string, any>, //<renderMode, component>
    Data: any,
    RenderMode: string
}
