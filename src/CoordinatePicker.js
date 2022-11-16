
import React from "react";

const CoordinatePicker = () => {
  const [imageDimensions, setImageDimensions] = React.useState({}),
    [imageUrl, setImageUrl] =React.useState(null) ,
    hiddenFileInput = React.useRef(null);
  const imageRef = React.useRef(null);
  const [cordinatePickerList, setCordinatePickerList] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const loadImage = (setImageDimensions, imageUrl) => {
    if (!imageUrl) return;
  
    const img = new Image();
    img.src = imageUrl;
  
    img.onload = () => {
      setImageDimensions({
        height: img.height,
        width: img.width,
      });
  
      console.log({ height: img.height, width: img.width });
    };
  
    img.onerror = (err) => {
      console.log("img error");
      console.error(err);
    };
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0],
      imageSrc = URL.createObjectURL(fileUploaded);
    setImageUrl(imageSrc);
  };

  React.useEffect(() => {
    loadImage(setImageDimensions, imageUrl);
    console.log(imageRef.current);
  }, [imageUrl]);

  React.useEffect(() => {
    console.log("cordinatePickerList", cordinatePickerList);
  }, [cordinatePickerList]);

  const handleImageClick = (event) => {
    const tolerance = 5;
    const target = event.target;
    const { clientX, clientY } = event;
    const rect = target.getBoundingClientRect();

    const clickXPos = Math.round(clientX - rect.left - tolerance);
    const clickYPos = Math.round(clientY - rect.top - tolerance);
    setCounter(counter + 1);
    const hotpsotId = `hotspotid-${counter}`;
    const clickedCord = { hotpsotId, clickXPos, clickYPos };

    setCordinatePickerList([...cordinatePickerList, clickedCord]);
  };

  const removehotspots = (hotspotId) => {
    console.log(hotspotId);
    const newCordinatePicerList = cordinatePickerList.filter((hotspot) => {
      return hotspot.hotpsotId !== hotspotId;
    });

    console.log(newCordinatePicerList);
    setCordinatePickerList(newCordinatePicerList);
  };
  const fontFamilys = "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif";
  return (
    <div className="CoordinatePicker" style={{textAlign: "center", fontFamily: fontFamilys}}>
      <p>Image Cordinate Picker</p>
      <button onClick={handleClick} style={{marginBottom: "20px"}}> Upload a image </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {imageUrl && (
        <div className="container" style={{margin: "0 auto", maxWidth: "1440px"}}>
          <div className="image-coordinate-picker">
            <div className="image-placeholder" style={{display: "inline-block", position: "relative"}}>
              <img
                src={imageUrl}
                ref={imageRef}
                onClick={(event) => handleImageClick(event)}
                alt="image-picker"
                style={{outline: "1px solid blue",width: "100%"}}
              />
              {cordinatePickerList.map((item, i) => (
                <div
                  key={i}
                  id={item.hotpsotId}
                  className="hotpsot"
                  style={{ 
                    left: item.clickXPos,
                    top: item.clickYPos,
                    position: "absolute",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "whitesmoke",
                    borderRadius: "50%"}}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {Object.keys(imageDimensions).length > 0 && (
        <div>
          <p>
            <b>Width:</b> {imageDimensions.width} 
            <b>Height:</b> {imageDimensions.height}{" "}
          </p>
          <ul style={{listStyle: "none"}}>
            {cordinatePickerList.map((item, i) => (
              <li className="cordinates" data-id={item.hotpsotId} key={i}>
               <span>hotpsot:</span> <b>{item.hotpsotId} {" "}</b>Coordinates:{" "}
                <b>{item.clickXPos},{item.clickYPos}</b>
                <button className=" remove-btn"onClick={() => removehotspots(item.hotpsotId)} style={{marginBottom: "10px"}}> Remove hotpsot</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CoordinatePicker;



