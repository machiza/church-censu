export type ChildMenu = {
  link?: any;
  childtitle: string;
  childlink: string;
  childicon: string;
};

export type SingleMegamenu = {
  m_childtitle: string;
  m_childlink: string;
};

export type MegaMenu = {
  megamenutitle: string;
  megamenuicon: string;
  singleMegamenu: SingleMegamenu[];
};

export type TopMenu = {
  title: string;
  isHide?: boolean;
  icon: string;
  link?: string;
  child?: ChildMenu[];
  megamenu?: MegaMenu[];
};

export type Notification = {
  title: string;
  desc: string;
  image: string;
  link: string;
  unread?: boolean;
}