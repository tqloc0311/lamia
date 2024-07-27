interface IBanner {
  id?: number;
  simple_slider_id?: number;
  title?: string | null;
  image?: string;
  link?: string;
  description?: string | null;
  order?: number;
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
}

class Banner implements IBanner {
  id?: number;
  simple_slider_id?: number;
  title?: string | null;
  image?: string;
  link?: string;
  description?: string | null;
  order?: number;
  created_at?: string;
  updated_at?: string;

  constructor(data: Banner = {}) {
    this.id = data.id;
    this.simple_slider_id = data.simple_slider_id;
    this.title = data.title;
    this.image = data.image;
    this.link = data.link;
    this.description = data.description;
    this.order = data.order;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

export default Banner;
