import { Images } from '../../utils/images';

interface MenuItem {
  id: number;
  icon: string;
  title: string;
  routeName?: string;
  routeData?: Record<string, any>;
  url?: string;
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    icon: Images.chat,
    title: 'Liên hệ',
    routeName: 'Contact',
    routeData: {},
  },
  {
    id: 2,
    icon: Images.store,
    title: 'Hệ thống cửa hàng',
    routeName: 'Page',
    routeData: {
      title: 'Hệ thống cửa hàng',
      path: 'page/he-thong-cua-hang',
    },
  },
  // {
  //   id: 3,
  //   icon: Images.document,
  //   title: 'Hướng dẫn sử dụng app',
  //   routeName: '',
  //   routeData: {},
  // },
  {
    id: 4,
    icon: Images.document,
    title: 'Tư vấn size',
    routeName: 'Page',
    routeData: {
      title: 'Tư vấn size',
      path: 'page/tu-van-size',
    },
  },
  {
    id: 5,
    icon: Images.document,
    title: 'Bảo quản',
    routeName: 'Page',
    routeData: {
      title: 'Bảo quản',
      path: 'page/bao-quan',
    },
  },
  {
    id: 6,
    icon: Images.document,
    title: 'Hướng dẫn mua hàng',
    routeName: 'Page',
    routeData: {
      title: 'Hướng dẫn mua hàng',
      path: 'page/huong-dan-mua-hang',
    },
  },
  {
    id: 7,
    icon: Images.document,
    title: 'Chính sách thanh toán',
    routeName: 'PaymentPolicy',
    routeData: {},
  },
  {
    id: 8,
    icon: Images.document,
    title: 'Chính sách vận chuyển',
    routeName: 'Page',
    routeData: {
      title: 'Chính sách vận chuyển',
      path: 'page/chinh-sach-van-chuyen',
    },
  },
  {
    id: 9,
    icon: Images.document,
    title: 'Chính sách đổi trả',
    routeName: 'Page',
    routeData: {
      title: 'Chính sách đổi trả',
      path: 'page/chinh-sach-doi-tra',
    },
  },
  // {
  //   id: 10,
  //   icon: Images.document,
  //   title: 'Chính sách bảo hành & sửa chữa',
  //   routeName: '',
  //   routeData: {},
  // },
  {
    id: 11,
    icon: Images.document,
    title: 'Chính sách điều khoản sử dụng',
    routeName: 'Page',
    routeData: {
      title: 'Chính sách điều khoản sử dụng',
      path: 'page/chinh-sach-bao-mat',
    },
  },
];
