// assets
import favorite from '../../assets/icons/favorite.svg'
import favorited from '../../assets/icons/favorited.svg'
import close from "../../assets/icons/close.svg";
import show from "../../assets/icons/show-more.svg";

const Icon = ({ category }) => {
  const icons = {
    Favorite: favorite,
    Favorited: favorited,
    Close: close,
    Show: show,
  };

  return (
    <img className="icon" src={icons[category]} alt={`A ${category} icon.`} />
  )
}

export default Icon
