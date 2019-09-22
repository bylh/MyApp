import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }


  // 获取网站类型
  async getNewsTypes() {
    try {
      const res = await axios.request({
        url: `${environment.NestServerUrl}/news/types/`,
        method: 'get',
        params: {}
      });
      return res.data as Array<Object>;
    } catch (err) {
      throw err;
    }
  }
  // 获取各网站头条
  async getNews(id: String) {
    try {
      const res = await axios.request({
        url: `${environment.NestServerUrl}/news/`,
        method: 'get',
        params: {id}
      });
      return res.data as Array<Object>;
    } catch (err) {
      throw err;
    }
  }

  async getMovies() {
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/get-movie`,
        method: 'get',
        params: {
          count: 20
        }
      });
      console.log('res:', res.data);
      return res.data.subjects;
    } catch (err) {
      console.log('err:', err);
      throw err;
    }
  }
}
