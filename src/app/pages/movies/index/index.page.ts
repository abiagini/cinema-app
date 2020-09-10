import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  movies = [
    {
      id: 1,
      title: 'The Avengers',
      description: 'A description to prove if i am a good programmer or a bad shitty programmer',
      rating: 4,
      image_url: 'http://lorempixel.com/600/480'
    },
    {
      id: 2,
      title: 'The Avengers',
      description: 'A description to prove if i am a good programmer or a bad shitty programmer',
      rating: 4,
      image_url: 'http://lorempixel.com/180/170/'
    },
    {
      id: 3,
      title: 'The Avengers',
      description: 'A description to prove if i am a good programmer or a bad shitty programmer',
      rating: 4,
      image_url: 'http://lorempixel.com/180/170/'
    },
    {
      id: 4,
      title: 'The Avengers',
      description: 'A description to prove if i am a good programmer or a bad shitty programmer',
      rating: 4,
      image_url: 'http://lorempixel.com/180/170/'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
