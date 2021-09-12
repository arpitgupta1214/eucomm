import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowRepeat, BsThreeDotsVertical } from "react-icons/bs";
import { RiAddCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { accountIntegrationActions } from "store/accountIntegrationSlice";
import s from "./connectedAccountResult.module.scss";

const ConnectedAccountResult = ({ result }) => {
  const openMenuAccount = useSelector(
    (state) => state.accountIntegration.openMenuAccount
  );
  const dispatch = useDispatch();
  const onClickMenu = ({ accountName }) => {
    if (
      openMenuAccount.platformName === result.name &&
      openMenuAccount.accountName === accountName
    ) {
      dispatch(accountIntegrationActions.setOpenMenuAccount({}));
    } else {
      dispatch(
        accountIntegrationActions.setOpenMenuAccount({
          platformName: result.name,
          accountName,
        })
      );
    }
  };
  return (
    <div className="w-full mb-6 p-6 bg-skin-light flex flex-col">
      <div className="flex items-center mb-6">
        {/* logo */}
        <div className="w-12 h-12 mr-5">
          <Image src={result.img} alt="" height="50" width="50" />
        </div>
        {/* heading */}
        <h1 className="text-xl font-bold">{result.name} connected account</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* add button  */}
        <button className="w-full px-6 pt-4 pb-3 flex items-center text-skin-highlight border-2 border-skin-highlight">
          <span className="h-5 w-5 mr-2 mb-1">
            <RiAddCircleLine className="w-full h-full" />
          </span>
          <span className="text-sm font-medium whitespace-nowrap">
            Add New Account
          </span>
        </button>

        {/* acounts list */}
        {result?.accounts?.map((account) => (
          <div
            key={`${result.name}-${account.name}`}
            className="w-full flex items-center p-2 min-w-0 bg-skin-base"
          >
            <div className="mr-2 w-7 h-7 rounded-full overflow-hidden">
              <Image src={account.img} alt="" height="50" width="50" />
            </div>
            <div className="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis mr-4 text-sm font-medium">
              {account.name}
            </div>
            <button
              className="w-6 h-6text-skin-extra-light relative"
              onClick={() => onClickMenu({ accountName: account.name })}
            >
              <BsThreeDotsVertical className="w-full h-full" />
              {openMenuAccount.platformName === result.name &&
                openMenuAccount.accountName === account.name && (
                  <div className={s.menu}>
                    <button className={s.btn}>
                      <BsArrowRepeat className={s.symbol} />
                      <div className={s.text}>Reconnect</div>
                    </button>
                    <button className={`${s.btn} text-red-500`}>
                      <AiOutlineDelete className={s.symbol} />
                      <div className={s.text}>Remove</div>
                    </button>
                  </div>
                )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedAccountResult;
