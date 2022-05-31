// import { themeChange } from 'theme-change';
import { useEffect, useState } from 'react';

// const themes = Object.keys(daisyuiThemes) || [''];
// export const defaultTheme = themes[0];

const ThemeToggle = () => {
  //   const [theme, setTheme] = useState(defaultTheme);
  //   useEffect(() => {
  //     themeChange(false);
  //     setTheme(
  //       document.documentElement.getAttribute('data-theme') || defaultTheme
  //     );
  //   }, []);
  //   return (
  //     <div className='form-control px-4'>
  //       <label className='cursor-pointer label'>
  //         <span className='label-text'>🌞</span>
  //         <input
  //           type='checkbox'
  //           className='toggle toggle-secondary mx-1'
  //           data-toggle-theme={themes.join(',')}
  //           data-act-class='active'
  //           checked={theme !== themes[0]}
  //           onClick={() =>
  //             setTheme(theme !== defaultTheme ? defaultTheme : themes[1])
  //           }
  //           readOnly
  //         />
  //         <span className='label-text'>🌚</span>
  //       </label>
  //     </div>
  //   );
};

export default ThemeToggle;
