import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category: { imageUrl, title } }) => {
  const navigate = useNavigate();
  const handleDirectoryItemClick = () => {
    navigate(`shop/${title}`)
  };
  return (
    <DirectoryItemContainer onClick={handleDirectoryItemClick}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem;
