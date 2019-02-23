import DiscoverySvg from './svg/discovery'
import PerformanceSvg from './svg/performance'
import LightningSvg from './svg/lightning'
import IntegrateSvg from './svg/integrate'

const Circle = ({ children }) => (
  <div className="circle">
    {children}
    <style jsx>
      {`
        .circle {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          width: 64px;
          height: 64px;
          background-color: #fff;
          border-radius: 32px;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.24);
        }
      `}
    </style>
  </div>
)

export const Discovery = () => <Circle><DiscoverySvg /></Circle>
export const Lightning = () => <Circle><LightningSvg /></Circle>
export const Integrate = () => <Circle><IntegrateSvg /></Circle>
export const Performance = () => <Circle><PerformanceSvg /></Circle>