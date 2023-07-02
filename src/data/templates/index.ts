import { FriendsImg, FriendsTemplate } from './friends';
import { StarTemplate, StarImg } from './star';

const templates = [
  {
    name: 'Star',
    img: StarImg,
    json: StarTemplate,
    dimension: {
      width: 1200,
      height: 1200,
    },
  },
  {
    name: 'Friends',
    img: FriendsImg,
    json: FriendsTemplate,
    dimension: {
      width: 1200,
      height: 1400,
    },
  },
];

export default templates;
