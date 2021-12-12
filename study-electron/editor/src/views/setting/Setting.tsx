import './Setting.scss';
import React from 'react';
import { Button, Container, Form, FormControl, InputGroup } from 'react-bootstrap';

const Setting = () => {
  return (
    <div className="home">
      <Container fluid className="container">
        <div className="settting">
          {/* title */}
          <div className="title">设置</div>

          {/* label */}
          <Form.Label htmlFor="basic-url">文件存储位置</Form.Label>
          {/* input */}
          <InputGroup className="mb-3">
            <FormControl disabled placeholder="当前存储位置" />
            <Button variant="outline-primary">选择新的位置</Button>
          </InputGroup>

          {/* save */}
          <Button>保存</Button>
        </div>
      </Container>
    </div>
  );
};

export default Setting;
