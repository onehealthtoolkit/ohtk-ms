import { MaskingLoader } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { DashBoardFilterData } from "./dashboardViewModel";
import { StatViewModel } from "./statViewModel";

const styles = {
  card: "grid  grid-cols-3 content-center  p-4 rounded-xl border-gray-200",
  text1: "self-center text-left text-base font-semibold text-white",
  text2: "self-center text-right text-3xl font-bold text-white mr-2",
  icon: "mt-4 w-6 h-6",
};
type StatViewProps = {
  authorityId: number;
  filter: DashBoardFilterData;
};

const StatView: React.FC<StatViewProps> = ({ authorityId, filter }) => {
  const services = useServices();
  const [viewModel] = useState(
    () => new StatViewModel(services.dashboardService)
  );

  useEffect(() => {
    console.log("useEffect");
    if (authorityId) viewModel.setSearchValue(authorityId, filter);
  }, [viewModel, authorityId, filter]);

  if (!authorityId) return <Spinner></Spinner>;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div className="grid md:grid-cols-4 gap-6">
        <div className={`${styles.card} bg-[#67C687]`}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2885 21.9039L16.7289 26.2562C16.875 26.3765 17.0461 26.4627 17.2297 26.5087C17.4133 26.5546 17.6049 26.559 17.7904 26.5216C17.9777 26.4864 18.1553 26.4113 18.311 26.3014C18.4667 26.1915 18.5969 26.0494 18.6927 25.8846L27.2116 11.2885"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.25 36.5C28.7769 36.5 36.5 28.7769 36.5 19.25C36.5 9.72309 28.7769 2 19.25 2C9.72309 2 2 9.72309 2 19.25C2 28.7769 9.72309 36.5 19.25 36.5Z"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className={styles.text1}>Reporter</div>
          <div className={styles.text2}>{viewModel.data.reporterCount}</div>
        </div>
        <div className={`${styles.card} bg-[#DA3535]`}>
          <svg
            width="37"
            height="44"
            viewBox="0 0 37 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.9736 2V7.81132"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M2.08478 9.13205L6.22163 13.2135"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M34.7736 9.13205L30.6367 13.2135"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M9.28829 40.7453H27.7789C29.0354 40.7453 30.1256 41.4573 30.6681 42.5H6.39907C6.94149 41.4573 8.03173 40.7453 9.28829 40.7453Z"
              stroke="white"
              strokeWidth="3"
            />
            <path
              d="M6.21359 34.9238V23.9245C6.21359 17.2137 11.6538 11.7736 18.3645 11.7736V11.7736C25.0753 11.7736 30.5155 17.2138 30.5155 23.9245V34.9238"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M16.3618 20.2839C16.3248 19.7077 16.7823 19.22 17.3597 19.22H19.4274C20.0049 19.22 20.4623 19.7077 20.4254 20.2839L19.8536 29.2039C19.8198 29.7303 19.3831 30.14 18.8556 30.14H17.9315C17.4041 30.14 16.9673 29.7303 16.9336 29.2039L16.3618 20.2839Z"
              fill="white"
            />
            <path
              d="M16.7136 32.82C16.7136 32.2677 17.1613 31.82 17.7136 31.82H19.0736C19.6259 31.82 20.0736 32.2677 20.0736 32.82V34.0288C20.0736 34.5811 19.6259 35.0288 19.0736 35.0288L17.7136 35.0288C17.1613 35.0288 16.7136 34.5811 16.7136 34.0288V32.82Z"
              fill="white"
            />
          </svg>
          <div className={styles.text1}>Open Case</div>
          <div className={styles.text2}> {viewModel.data.openCaseCount}</div>
        </div>
        <div className={`border-2 ${styles.card} bg-white `}>
          <svg
            width="32"
            height="39"
            viewBox="0 0 32 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.6917 2V6.98113"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M2.07263 8.11316L5.6185 11.6115"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M30.0918 8.11316L26.5459 11.6115"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M6.15335 36.5C6.62072 35.8487 7.3844 35.4245 8.24716 35.4245H24.0962C24.959 35.4245 25.7227 35.8487 26.19 36.5H6.15335Z"
              stroke="white"
              strokeWidth="3"
            />
            <path
              d="M5.61145 30.2204V20.7925C5.61145 15.0404 10.2744 10.3774 16.0265 10.3774V10.3774C21.7786 10.3774 26.4416 15.0404 26.4416 20.7925V30.2204"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M14.3197 17.8239C14.2828 17.2476 14.7402 16.7599 15.3177 16.7599H16.7854C17.3628 16.7599 17.8203 17.2476 17.7833 17.8239L17.3115 25.1839C17.2778 25.7103 16.841 26.1199 16.3136 26.1199H15.7895C15.262 26.1199 14.8253 25.7103 14.7915 25.1839L14.3197 17.8239Z"
              fill="white"
            />
            <path
              d="M14.6115 28.56C14.6115 28.0077 15.0592 27.56 15.6115 27.56H16.4914C17.0437 27.56 17.4915 28.0077 17.4915 28.56V29.3104C17.4915 29.8627 17.0437 30.3104 16.4915 30.3104L15.6115 30.3104C15.0592 30.3104 14.6115 29.8627 14.6115 29.3104V28.56Z"
              fill="white"
            />
            <path
              d="M15.6917 2V6.98113"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M2.07263 8.11316L5.6185 11.6115"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M30.0918 8.11316L26.5459 11.6115"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M6.15335 36.5C6.62072 35.8487 7.3844 35.4245 8.24716 35.4245H24.0962C24.959 35.4245 25.7227 35.8487 26.19 36.5H6.15335Z"
              stroke="white"
              strokeWidth="3"
            />
            <path
              d="M5.61145 30.2204V20.7925C5.61145 15.0404 10.2744 10.3774 16.0265 10.3774V10.3774C21.7786 10.3774 26.4416 15.0404 26.4416 20.7925V30.2204"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M14.3197 17.8239C14.2828 17.2476 14.7402 16.7599 15.3177 16.7599H16.7854C17.3628 16.7599 17.8203 17.2476 17.7833 17.8239L17.3115 25.1839C17.2778 25.7103 16.841 26.1199 16.3136 26.1199H15.7895C15.262 26.1199 14.8253 25.7103 14.7915 25.1839L14.3197 17.8239Z"
              fill="white"
            />
            <path
              d="M14.6115 28.56C14.6115 28.0077 15.0592 27.56 15.6115 27.56H16.4914C17.0437 27.56 17.4915 28.0077 17.4915 28.56V29.3104C17.4915 29.8627 17.0437 30.3104 16.4915 30.3104L15.6115 30.3104C15.0592 30.3104 14.6115 29.8627 14.6115 29.3104V28.56Z"
              fill="white"
            />
            <path
              d="M7.99988 10.5714C7.99988 7.25773 10.6862 4.57144 13.9999 4.57144H18.2856C21.5993 4.57144 24.2856 7.25773 24.2856 10.5714V16.5714C24.2856 19.8852 21.5993 22.5714 18.2856 22.5714H13.9999C10.6862 22.5714 7.99988 19.8851 7.99988 16.5714V10.5714Z"
              stroke="#5E7284"
              strokeWidth="3"
            />
            <path
              d="M14.9962 26.9733L13.9191 28.0172L13.9191 28.0172L14.9962 26.9733ZM16.4325 26.9733L15.3553 25.9294V25.9294L16.4325 26.9733ZM12.6328 24.5346L13.71 23.4907L13.268 23.0346H12.6328V24.5346ZM18.7959 24.5346V23.0346H18.1608L17.7187 23.4907L18.7959 24.5346ZM13.9191 28.0172C14.9013 29.0308 16.5274 29.0308 17.5096 28.0172L15.3553 25.9294C15.5518 25.7267 15.877 25.7267 16.0734 25.9294L13.9191 28.0172ZM11.5556 25.5785L13.9191 28.0172L16.0734 25.9294L13.71 23.4907L11.5556 25.5785ZM9 26.0346H12.6328V23.0346H9V26.0346ZM3.5 31.5346C3.5 28.497 5.96243 26.0346 9 26.0346V23.0346C4.30558 23.0346 0.5 26.8401 0.5 31.5346H3.5ZM3.5 36.1429V31.5346H0.5V36.1429H3.5ZM3 35.6429C3.27614 35.6429 3.5 35.8667 3.5 36.1429H0.5C0.5 37.5236 1.61929 38.6429 3 38.6429V35.6429ZM29.0922 35.6429H3V38.6429H29.0922V35.6429ZM28.5922 36.1429C28.5922 35.8667 28.816 35.6429 29.0922 35.6429V38.6429C30.4729 38.6429 31.5922 37.5236 31.5922 36.1429H28.5922ZM28.5922 31.5346V36.1429H31.5922V31.5346H28.5922ZM23.0922 26.0346C26.1297 26.0346 28.5922 28.497 28.5922 31.5346H31.5922C31.5922 26.8401 27.7866 23.0346 23.0922 23.0346V26.0346ZM18.7959 26.0346H23.0922V23.0346H18.7959V26.0346ZM17.5096 28.0172L19.8731 25.5785L17.7187 23.4907L15.3553 25.9294L17.5096 28.0172Z"
              fill="#5E7284"
            />
            <path
              d="M8.85699 5.42856L7.1427 11.4286L15.5494 5.54149L8.85699 5.42856Z"
              fill="#5E7284"
            />
            <path
              d="M8.42847 27.7143L12.7142 32.4286L15.7142 29.8572L18.7142 32.4286L22.1428 27.7143"
              stroke="#5E7284"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M23.4287 5.42856V13.1428L13.3406 5.57914L23.4287 5.42856Z"
              fill="#5E7284"
            />
            <circle cx="19.5714" cy="14.4286" r="1.28571" fill="#5E7284" />
            <circle cx="12.7143" cy="14.4286" r="1.28571" fill="#5E7284" />
            <path
              d="M4.14294 9.85715C4.14294 9.30486 4.59066 8.85715 5.14294 8.85715H26.7144C27.2667 8.85715 27.7144 9.30486 27.7144 9.85715V10.4286C27.7144 10.9809 27.2667 11.4286 26.7144 11.4286H5.14294C4.59066 11.4286 4.14294 10.9809 4.14294 10.4286V9.85715Z"
              fill="#5E7284"
            />
            <path
              d="M6.28577 6C6.28577 3.79086 8.07663 2 10.2858 2H22.0001C24.2092 2 26.0001 3.79086 26.0001 6V8.85714H6.28577V6Z"
              fill="#5E7284"
            />
          </svg>
          <div className={`${styles.text1} text-[#67B1C6]`}>Official</div>
          <div className={`${styles.text2} text-[#67B1C6]`}>
            {viewModel.data.officialCount}
          </div>
        </div>
      </div>
    </MaskingLoader>
  );
};

export default observer(StatView);
