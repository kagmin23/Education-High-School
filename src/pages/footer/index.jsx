import { ApartmentOutlined, FacebookOutlined, FieldTimeOutlined, HomeOutlined, InstagramOutlined, IssuesCloseOutlined, MailOutlined, PaperClipOutlined, PhoneOutlined, TwitterOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bottom-0 w-full p-8 text-white bg-blue-700 ">
      {/* Grid for footer layout */}
      <div className="container grid grid-cols-1 gap-8 mx-auto md:grid-cols-3">
        
        {/* About section */}
        <div>
          <h2 className="text-lg font-bold"><ApartmentOutlined />&nbsp;&nbsp;&nbsp;&nbsp;High School</h2>
          <ul className="mt-4">
              {/* <li className="mb-2"><PhoneOutlined />&nbsp;&nbsp;&nbsp;(+84) 342-555-702</li> */}
              <li className="mb-2"><HomeOutlined />&nbsp;&nbsp;&nbsp;Trường THPT, Vũng Tàu, VietNam</li>
              {/* <li className="mb-2"><MailOutlined />&nbsp;&nbsp;&nbsp;phankangmin@gmail.com</li> */}
              <li><FieldTimeOutlined />&nbsp;&nbsp;&nbsp;Date/Time: 07:00 AM - 5:00 PM</li>
              <li className="mb-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Monday to Friday</li>
              <li><IssuesCloseOutlined />&nbsp;&nbsp;&nbsp;Close: Saturday and Sunday</li>
            </ul>
        </div>
        
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-blue-400">Trang chủ</a></li>
            <li><a href="#" className="hover:text-blue-400">Giáo án</a></li>
            <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400">Chất lượng</a></li>
          </ul>
        </div>
        
        {/* Contact Info and Social Media */}
        <div>
          <h2 className="text-lg font-bold">Liên hệ</h2>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center">
              <PhoneOutlined className="mr-2" /> +123 456 789
            </li>
            <li className="flex items-center">
              <MailOutlined className="mr-2" /> phankangmin@gmail.com
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex mt-4 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined className="text-2xl hover:text-blue-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined className="text-2xl hover:text-blue-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined className="text-2xl hover:text-pink-500" />
            </a>
            <a href="https://site.com" target="_blank" rel="noopener noreferrer">
              <PaperClipOutlined className="text-2xl hover:text-blue-700" />
            </a>
          </div>
        </div>
      </div>

      <p className="mt-10 text-sm text-center">
          Trường THPT cam kết cung cấp nền Giáo dục chất lượng để chuẩn bị cho nguồn đầu ra học sinh trong tương lai.
          </p>

      {/* Footer Bottom */}
      <div className="pt-4 mt-8 text-sm text-center border-t border-gray-700">
        <p>High School ©2024 Created by KagMin</p>
        <p>
          <a href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</a> |
          <a href="/terms" className="ml-1 hover:text-blue-400">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
