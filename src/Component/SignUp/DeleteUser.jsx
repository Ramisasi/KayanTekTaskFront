import React, { useEffect, useState } from "react";
import SignUpStyle from "./signUpStyle.module.css";
import useUserById from "../../Hooks/useUserById";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/UserData";
import { conIp } from "../../connection";

export default function DeleteUser({ userId, stat }) {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let { UserDate, state } = useUserById(userId);
  let [deletedUser, setDeletedUser] = useState(false);

  const startMassage = "هل ترغب في حذف المستخدم";
  const endMassage =
    "أن كنت تريد الاستمرار إضغط نعم! وللإلغاء إضغط الرز الاحمر فوق ";
  const doDeleteUser = async () => {
    await axios
      .delete(`${conIp}/api/v1/user/deleteUser`, {
        params: {
          id: UserDate.userId,
        },
        headers: {
          authorization: token,
        },
      })
      .then((result) => {
        setDeletedUser(true);
        stat(true);
      })
      .catch((err) => {
        console.log(err);
        if (err) setDeletedUser(false);
      });
  };
  useEffect(() => {
    dispatch(setUser());
  }, []);
  return (
    <div className={SignUpStyle.updateFormChildren}>
      <div className='fileTitle'>عملية حذف</div>
      <div className={SignUpStyle.deleteForm}>
        {state ? (
          <>
            <h5>عملية حدف </h5>
            {!deletedUser ? (
              <>
                <p>{`${startMassage} ${UserDate.userName} ${endMassage}`}</p>
                <div className="text-start">
                  <button
                    onClick={() => doDeleteUser()}
                    className="btn btn-outline-danger py-2 px-4"
                  >
                    حذف
                  </button>
                </div>
              </>
            ) : (
              <p>تم الحذف بنجاح</p>
            )}
          </>
        ) : (
          <p>حدث خطاء الرجاء الضغط علي الإلغاء ثم إعادة المحاولة</p>
        )}
      </div>
    </div>
  );
}
