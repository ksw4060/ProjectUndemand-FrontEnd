import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// CSS
import "./AddressListPage.css";
import "./AddressRegistrationPage.css";

function AddressListPage({ isLoggedin, memberId }) {
  const [addressLists, setAddressLists] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAddressLists();
  }, [memberId]);

  const fetchAddressLists = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/address/${memberId}`,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
          withCredentials: true,
        }
      );
      setAddressLists(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const addressId = parseInt(value, 10); // value를 숫자로 변환

    setSelectedAddresses((prevSelectedAddresses) => {
      const updatedSelectedAddresses = checked
        ? [...prevSelectedAddresses, addressId]
        : prevSelectedAddresses.filter((id) => id !== addressId);

      // 전체 선택 체크박스의 상태를 업데이트
      setAllChecked(updatedSelectedAddresses.length === addressLists.length);

      return updatedSelectedAddresses;
    });
  };

  const handleAllCheckChange = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    if (checked) {
      const allAddressIds = addressLists.map((address) => address.addressId);
      setSelectedAddresses(allAddressIds);
    } else {
      setSelectedAddresses([]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const deletePromises = selectedAddresses.map((addressId) =>
        axios.delete(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/address/${memberId}/${addressId}`,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
            withCredentials: true,
          }
        )
      );
      await Promise.all(deletePromises);
      console.log("Addresses deleted");
      fetchAddressLists(); // 주소 목록 다시 불러오기
      setSelectedAddresses([]); // 선택된 주소 초기화
      setAllChecked(false); // 전체 선택 체크박스 상태 초기화
    } catch (error) {
      console.error("Error deleting addresses:", error);
    }
  };

  return (
    <div className="my-address-list-page">
      <div className="my-address-list-page-top">
        <div className="my-address-list-page-title">
          <h2>Address</h2>
          <div className="total-payhis-count">
            ({`${Object.keys(addressLists).length}개`})
          </div>
        </div>
        <p>자주 쓰는 배송지를 등록 관리하실 수 있습니다.</p>
      </div>

      <div className="my-address-list-container">
        <table border="1" summary="" className="ec-base-table">
          <colgroup className="address-table-header">
            <col style={{ width: "27px" }} />
            <col style={{ width: "80px" }} />
            <col style={{ width: "95px" }} />
            <col style={{ width: "95px" }} />
            <col style={{ width: "140px" }} />
            <col style={{ width: "auto" }} />
            <col style={{ width: "80px" }} />
          </colgroup>
          <thead className="address-list-header">
            <tr>
              <th scope="col">
                <input
                  id="allCheck"
                  type="checkbox"
                  checked={allChecked}
                  onChange={handleAllCheckChange}
                />
              </th>

              <th scope="col">주소록 고정</th>
              <th scope="col">배송지명</th>
              <th scope="col">수령인</th>
              <th scope="col">휴대전화</th>
              <th scope="col">주소</th>
              <th scope="col">edit</th>
            </tr>
          </thead>
          <tbody>
            {addressLists.length > 0 ? (
              addressLists.map((address) => (
                <tr key={address.addressId}>
                  <td>
                    <input
                      type="checkbox"
                      name="ma_idx[]"
                      value={address.addressId}
                      checked={selectedAddresses.includes(address.addressId)}
                      onChange={handleCheckboxChange}
                    />
                  </td>
                  <td>
                    <a
                      href={`/exec/front/Myshop/Addr/?mode=Fix&ma_idx=${address.addressId}&ma_fixed_flag=F&return_url=%2Fmyshop%2Faddr%2Flist.html`}
                    >
                      <img
                        src="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_address_fix.gif"
                        alt="고정"
                      />
                    </a>
                  </td>
                  <td>
                    {address.defaultAddress ? (
                      <>
                        <img
                          src="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/ico_addr_default.gif"
                          alt="기본"
                        />{" "}
                        <span>{address.addressName}</span>
                      </>
                    ) : (
                      <span>{address.addressName}</span>
                    )}
                  </td>
                  <td>
                    <span>{address.recipient}</span>
                  </td>
                  <td>
                    <span>{address.recipientPhone}</span>
                  </td>
                  <td className="left">
                    (<span>{address.postCode}</span>){" "}
                    <span>{address.address}</span>{" "}
                    <span>{address.detailAddress}</span>
                  </td>
                  <td>
                    <Link
                      to={`/user/mypage/address-update/${address.addressId}`}
                    >
                      <img
                        src="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_address_modify.gif"
                        alt="수정"
                      />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="message">
                  등록된 주소가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="form-actions button-box">
        <button onClick={handleDeleteSelected}>선택 주소 삭제</button>
        <Link
          to="/user/mypage/address-registration"
          className="address-registration-btn"
        >
          배송지 등록
        </Link>
      </div>
    </div>
  );
}

export { AddressListPage };
