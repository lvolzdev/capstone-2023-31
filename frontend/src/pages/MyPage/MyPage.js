import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Record from "../../components/Record/Record";
import ModalComponent from "../../components/Modal/ModalComponent";
import "./MyPage.css";
import "../../components/Modal/Modal.css";
import { useState, useEffect } from "react";
import { Button, Row, Col } from "antd";
import EditProfile from "../../components/EditProfile";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


function MyPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [updatedpassword, setUpdatePassword] = useState("");
  const [faceShape, setFaceShape] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sendSetProfileRequest = async () => {
    try {
      const csrfResponse = await axios.get('/user/get-csrf-token/');
      const csrfToken = csrfResponse.data.csrfToken;

      const response = await axios.post('/setprofile/', null, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });

      if (response.data.success) {
        const data = response.data;
        console.log(data);
        setNickname(data.nickname);
        setFaceShape(data.face_shape);
        handleCancel();
        
      }
      
    } catch (error) {
      console.error(error);
    }

  };

  const handleProfileUpdate = (updatedNickname, lastPassword, updatedPassword) => {
    try {
      axios.get('/user/get-csrf-token/')
        .then(response => {
          const csrfToken = response.data.csrfToken;

          axios.post('/user/edit-profile/', {
            nickname: updatedNickname,
            lastpassword: lastPassword,
            updatedpassword: updatedPassword
          }, {
            headers: {
              'X-CSRFToken': csrfToken
            }
          })
            .then(response => {
              if (response.data.success) {
                // 업데이트 성공한 경우 처리
                const data = response.data;
                alert(data.message);
                // Assuming setNickname and setUpdatePassword are defined somewhere else in your code.
                if (data.nickname) {
                  setNickname(data.nickname);
                }
                if (data.updatedpassword) {
                  setUpdatePassword(data.updatedpassword);
                }

                handleCancel();
                window.location.reload();
              }
              else {
                // 업데이트 실패한 경우 처리
                alert(response.data.message);
              }
            })
            .catch(error => {
              console.error(error);
            });
        });
    }
    catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    sendSetProfileRequest();
  }, []);
  const gridData = [
    { id: 1, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 2, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 3, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 4, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 5, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 6, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 7, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 8, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 9, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 10, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 11, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 12, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 13, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },
    { id: 14, image: '/images/image1.png', brandName: "AAA", name: "BBB", price: "30,000" },

  ];


  return (
    <div className="container">
      <Header />
      <div className="mypage-container">
        <div className="user">
          <div style={{ fontSize: "25px", fontWeight: "bold" }}>마이페이지</div>
          <div className="profile-edit">
            <div style={{ margin: "20px" }}>
              {`${nickname}님의 얼굴형: ${faceShape}`}
            </div>
            <div>
              <Button
                style={{ margin: "10px", width: "200px" }}
                onClick={() => navigate("/analyze/camera")}
              >
                얼굴형 재분석
              </Button>
              <Button
                style={{ margin: "10px", width: "200px" }}
                onClick={showModal}
              >
                프로필 편집
              </Button>
            </div>
          </div>
        </div>

        <ModalComponent
          title="프로필 편집"
          isOpen={isModalOpen}
          onCancel={handleCancel}
        >
          <EditProfile onUpdate={handleProfileUpdate} />
          <Button onClick={handleProfileUpdate} style={{ float: "right" }}>
            변경하기
        </Button>
        </ModalComponent>



        <div className="dibs">
          <div style={{ fontSize: "20px", margin: "0 30px" }}>찜한 안경</div>
          <div className="list-glasses" style={{ marginBottom: "0" }}>
            <Row gutter={[8, 8]}>
              {gridData.map((item, index) => (
                <Col key={index} lg={6} md={8} sm={12} xs={24}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3rem" }}
                >
                  <Link
                    className="link"
                    to={`/detail`}
                    state={item}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <img
                        style={{ width: '250px', height: "160px" }}
                        src={item.image}
                      >
                      </img>
                      <div>
                        <div>{item.brandName}</div>
                        <div>{item.name}</div>
                        <div>{item.price}원</div>
                      </div>
                    </div>
                  </Link>

                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
      <Footer name="mypage" />
    </div>


  )
}

export default MyPage; 