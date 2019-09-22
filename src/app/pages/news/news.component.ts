import { NewsService } from './../../services/news.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonContent } from '@ionic/angular';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  @ViewChild(IonContent, {static: false}) content: IonContent;

  news: Array<Object> = [];
  newsTypes: Array<Object> = [];
  currentNews: Object = null;
  showMore: Boolean = false;

  constructor(private newsService: NewsService) { }

  async ngOnInit() {
    this.newsTypes = await this.newsService.getNewsTypes();
    this.currentNews = this.newsTypes[0];
    // await this.getNews((this.newsTypes[0] as any) .id);
    console.log('this.news', this.news);
  }

  async getNews(id: String) {
    // this.currentId = id;
    this.news = await this.newsService.getNews(id);
  }

  async changeNewsType(event: CustomEvent) {
    console.log('this.currentNews', this.currentNews);
    this.currentNews = (event.target as any).value;
    await this.getNews((this.currentNews as any).id)
  }
  controlPanel() {
    this.showMore = !this.showMore;
  }

  scrollToTop() {
    console.log(this.content);
    this.content.scrollToTop();
  }
}
