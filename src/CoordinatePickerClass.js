import React from 'react';
import ReactDOM from 'react-dom/client';

class CoordinatePickerClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageDimensions: '',
            imageUrl: '',
            cordinatePickerList: [],
            counter: 0
        }

        this.hiddenFileInput = React.createRef(null);
        this.imageRef = React.createRef(null);

        console.log(this.state)
    }

    handleClick = (event) => {
        this.hiddenFileInput.current.click();
    };

    handleChange = (event) => {
        const fileUploaded = event.target.files[0],
            imageSrc = URL.createObjectURL(fileUploaded);

        this.setState({
            imageUrl: imageSrc
        })

        this.loadImage(imageSrc)
    };

    handleImageClick = (event) => {
        console.log(event)
        const tolerance = 5;
        const target = event.target;
        const { clientX, clientY } = event;
        const rect = target.getBoundingClientRect();

        const clickXPos = Math.round(clientX - rect.left - tolerance);
        const clickYPos = Math.round(clientY - rect.top - tolerance);
        const hotpsotId = `hotspotid-${this.state.counter}`;
        const clickedCord = { hotpsotId, clickXPos, clickYPos };

        const newArray = [...this.state.cordinatePickerList, clickedCord]
        console.log(newArray)

        this.setState((state) => ({
            counter: state.counter + 1,
            cordinatePickerList: newArray
        }))
    };

    removehotspots = (hotspotId) => {
        console.log(hotspotId);
        const newCordinatePicerList = this.state.cordinatePickerList.filter((hotspot) => {
            return hotspot.hotpsotId !== hotspotId;
        });

        console.log(newCordinatePicerList);

        this.setState({
            cordinatePickerList: newCordinatePicerList
        })
    };

    loadImage = (imageUrl) => {
        if (!imageUrl) return;

        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            const imgDimensions = { height: img.height, width: img.width }
            console.log(imgDimensions);

            this.setState({
                imageDimensions: imgDimensions
            })
        };

        img.onerror = (err) => {
            console.log("img error");
            console.error(err);
        };
    };

    render() {
        return (
            <div className="CoordinatePicker" style={{ textAlign: "center" }}>
                <p>Image Cordinate Picker</p>
                <button onClick={this.handleClick} style={{ marginBottom: "20px" }}> Upload a image </button>
                <input type="file"
                    ref={this.hiddenFileInput}
                    onChange={this.handleChange}
                    style={{ display: "none" }}
                />

                {Object.keys(this.state.imageUrl).length > 0 && (
                    <div className="container" style={{ margin: "0 auto", maxWidth: "1440px" }}>
                        <div className="image-coordinate-picker">
                            <div className="image-placeholder" style={{ display: "inline-block", position: "relative" }}>
                                <img
                                    src={this.state.imageUrl}
                                    ref={this.imageRef}
                                    onClick={(event) => this.handleImageClick(event)}
                                    alt="image-picker"
                                    style={{ outline: "1px solid blue", width: "100%" }}
                                />
                                {Object.keys(this.state.cordinatePickerList).length > 0 && this.state.cordinatePickerList.map((item, i) => (
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
                                            borderRadius: "50%"
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {Object.keys(this.state.imageDimensions).length > 0 && (
                    <div>
                        <p>
                            <b>Width:</b> {this.state.imageDimensions.width}
                            <b>Height:</b> {this.state.imageDimensions.height}{" "}
                        </p>
                        <ul style={{ listStyle: "none" }}>
                            {this.state.cordinatePickerList.map((item, i) => (
                                <li className="cordinates" data-id={item.hotpsotId} key={i}>
                                    <span>hotpsot:</span> <b>{item.hotpsotId} {" "}</b>Coordinates:{" "}
                                    <b>{item.clickXPos},{item.clickYPos}</b>
                                    <button className=" remove-btn" onClick={() => this.removehotspots(item.hotpsotId)} style={{ marginBottom: "10px" }}> Remove hotpsot</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}

export default CoordinatePickerClass

var domContainer = document.querySelector('#coordinate-picker');
// ReactDOM.render(React.createElement(CoordinatePickerClass, null), domContainer);