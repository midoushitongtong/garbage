import React from 'react';
import { Alert, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useKeyPress from '../../hooks/useKeyPress';
import './FileSearch.scss';

// component props
type Props = {
  title: string;
  onFileSearch: (keyword: string) => void;
};

const FileSearch = (props: Props) => {
  const { title, onFileSearch } = props;

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const inputActiveContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [inputActive, setInputActive] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');

  // 是否按下 enter
  const enterPressed = useKeyPress(['Enter']);
  // 是否按下 esc
  const escPressed = useKeyPress(['Escape', 'Esc']);
  // 如果打开 search, 点击了外部区域, 关闭 search
  useOnClickOutside(inputActiveContainerRef, () => {
    if (inputActive) {
      closeSearch();
    }
  });

  // 打开 search
  const openSearch = React.useCallback((e: any) => {
    setInputActive(true);
  }, []);

  // 关闭 search
  const closeSearch = React.useCallback(() => {
    setInputActive(false);
  }, []);

  // 提交搜索
  const submitSearch = React.useCallback(() => {
    closeSearch();
    onFileSearch(keyword);
    setKeyword('');
  }, [closeSearch, onFileSearch, keyword]);

  // 每次打开 search 的时候: 光标 focus 到 input 上
  React.useEffect(() => {
    if (inputActive) {
      inputRef.current?.focus();
    }
  }, [inputActive]);

  // 处理按下 esc, enter
  React.useEffect(() => {
    if (escPressed && inputActive) {
      closeSearch();
    } else if (enterPressed && inputActive) {
      submitSearch();
    }
  }, [closeSearch, enterPressed, escPressed, inputActive, submitSearch]);

  return (
    <div className="file-search">
      <Alert variant="primary">
        {!inputActive ? (
          <div className="search-container d-flex align-items-center justify-content-between">
            {/* search tooltip text */}
            <span className="search-tooltip-text me-2">{title}</span>
            {/* search button */}
            <button className="icon-button" onClick={openSearch}>
              <FontAwesomeIcon className="icon" icon={faSearch} title="搜索" />
            </button>
          </div>
        ) : (
          <div
            ref={inputActiveContainerRef}
            className="search-container d-flex align-items-center justify-content-between"
          >
            {/* search input */}
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="文档名称"
              className="search-input me-2"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {/* close button */}
            <button className="icon-button" onClick={closeSearch}>
              <FontAwesomeIcon className="icon" icon={faTimes} title="关闭" />
            </button>
          </div>
        )}
      </Alert>
    </div>
  );
};

export default FileSearch;
