import axios from '@/utils/request';
import { apiBase } from '@/services/shopConfig';

export async function queryDraftOrders(parameters) { //根据参数筛选draft_orders并返回
    return await axios.get(apiBase + '/draft_orders.json'+parameters)
}

export async function queryDraftsPage(url) { //根据url请求orders并返回
    return await axios.get(url)
}