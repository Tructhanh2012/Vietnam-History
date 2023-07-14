import React, { memo } from 'react';
import useSharedLogic from '../shared.logic';
import styles from './style.module.scss';

const Component = (props) => {
   const { className = '', tabs = '', smallHeader = false, adaptContainerWidth = true, hideCover = false, showFacepile = true } = props;

   const {} = useSharedLogic(props);

   const FanpageDOM = () => {
      return (
         <div
            className="fb-page w-100"
            data-href={props.link}
            data-tabs={tabs}
            data-small-header={smallHeader}
            data-adapt-container-width={adaptContainerWidth}
            data-hide-cover={hideCover}
            data-show-facepile={showFacepile}
            data-lazy="true"
         >
            <blockquote cite={props.link} className="fb-xfbml-parse-ignore">
               <a href={props.link}></a>
            </blockquote>
         </div>
      );
   };

   return <div className={`${styles.pcFacebook} ${className} w-100`}>{FanpageDOM()}</div>;
};

export default React.memo(Component, (prev, next) => {
   const className = prev.className === next.className;
   const link = prev.link === next.link;

   return className && link;
});
