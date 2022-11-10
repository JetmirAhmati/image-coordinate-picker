import logo from "./logo.svg";
import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";

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

const App = () => {
  const [imageDimensions, setImageDimensions] = useState({}),
    [imageUrl, setImageUrl] = useState(null), //"https://picsum.photos/200/300";
    hiddenFileInput = useRef(null);
  const imageRef = useRef(null);
  const [cordinatePickerList, setCordinatePickerList] = useState([]);
  const [counter, setCounter] = useState(0);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0],
      imageSrc = URL.createObjectURL(fileUploaded);
    setImageUrl(imageSrc);
  };

  useEffect(() => {
    loadImage(setImageDimensions, imageUrl);
    console.log(imageRef.current);
  }, [imageUrl]);

  useEffect(() => {
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

  return (
    <div className="App">
      <img src={logo} width="45px" />
      <p>Image Cordinate Picker</p>
      <button onClick={handleClick}> Upload a image </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {imageUrl && (
        <div className="container">
          <div>
            <div className="image-placeholder">
              <img
                src={imageUrl}
                ref={imageRef}
                onClick={(event) => handleImageClick(event)}
              />
              {cordinatePickerList.map((item, i) => (
                <div
                  key={i}
                  id={item.hotpsotId}
                  className="hotpsot"
                  style={{ left: item.clickXPos, top: item.clickYPos }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {Object.keys(imageDimensions).length > 0 && (
        <>
          <p>
            <b>Width:</b>
            {imageDimensions.width} <b>Height:</b>
            {imageDimensions.height}{" "}
          </p>
          <div>
            {cordinatePickerList.map((item, i) => (
              <div className="cordinates" data-id={item.hotpsotId} key={i}>
                hotpsot: <b>{item.hotpsotId}</b> Coordinates:{" "}
                <b>
                  {item.clickXPos}, {item.clickYPos}
                </b>
                <button
                  className=" remove-btn"
                  onClick={() => removehotspots(item.hotpsotId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
