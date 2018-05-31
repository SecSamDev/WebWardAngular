import { PipelineNode } from "./node";
import { Observable } from 'rxjs/Observable';

export function getStoredNodes(http,AppSettings): Observable<PipelineNode[]> {
    return http.get(AppSettings.API_ENDPOINT + 'nodes').map(data => data as PipelineNode[]);
}
export function updateStoredNode(http,AppSettings, node): Observable<PipelineNode> {
    return http.put(AppSettings.API_ENDPOINT + 'nodes/' + node.id, node, { responseType: 'json' }).map(data => data as PipelineNode);
}
export function removeStoredNode(http,AppSettings, node): Observable<PipelineNode> {
    return http.delete(AppSettings.API_ENDPOINT + 'nodes/' + node.id).map(data => data as PipelineNode);
}
export function createStoredNode(http,AppSettings, node): Observable<PipelineNode> {
    return http.post(AppSettings.API_ENDPOINT + 'nodes',node, { responseType: 'json' }).map(data => data as PipelineNode);
}