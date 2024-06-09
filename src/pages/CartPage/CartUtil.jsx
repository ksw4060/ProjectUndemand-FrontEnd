import axios from "axios";
import swal from "sweetalert";

// handleCartSubmit 함수를 별도로 정의하고 export
export const handleCartSubmit = async (
  isLoggedin,
  selectedInvenId,
  memberId,
  quantity,
  setCartProducts,
  navigate
) => {
  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${memberId}`,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
          withCredentials: true,
        }
      );
      setCartProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoggedin) {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/add/${selectedInvenId}`,
        {
          memberId: memberId,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        swal({
          title: `장바구니에 상품을 담았습니다!`,
          text: `장바구니로 이동하시겠어요?`,
          icon: "success",
          buttons: {
            cancel: "취소",
            navigate: "확인",
          },
        }).then((value) => {
          switch (value) {
            case "navigate":
              navigate("/cart");
              break;

            default:
              break;
          }
        });
        fetchCartData();
      })
      .catch((error) => {
        if (error.response.data === `For input string: "null"`) {
          swal({
            title: "모든 옵션을 선택해 주세요!",
          });
        }
      });
  } else {
    swal({
      title: "로그인 후 이용 가능해요!",
    });
  }
};

export const handleAddAllToCart = async (
  isLoggedin,
  orderId,
  orderGroup,
  handleSearchInvenId,
  memberId,
  setCartProducts,
  navigate,
  parseOption
) => {
  if (!isLoggedin) {
    swal({
      title: "로그인 후 이용 가능해요!",
    });
    return;
  }

  const products = orderGroup[orderId].products;
  for (const product of products) {
    const { color, size } = parseOption(product.option);
    const invenId = handleSearchInvenId(color, size);
    if (invenId) {
      await handleCartSubmit(
        isLoggedin,
        invenId,
        memberId,
        product.productQuantity,
        setCartProducts,
        navigate
      );
    }
  }
};
