using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LmxYun.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SalAjxfilesUpload(HttpPostedFileBase[] fileToUpload)
        {
            //string strFileRevisionID = "1";
            string[] strResult = new string[3];
            try
            {
                if (fileToUpload != null)
                {
                    foreach (HttpPostedFileBase file in fileToUpload)
                    {
                        string strFileName = fileToUpload[0].FileName;
                        //string strFileRevisionID = objCloudStorage.SalGetFileRevisionID();
                        //string strFileStoreName = objCloudStorage.SalGetFileStoreName(strFileRevisionID, strFileExtension);
                        //string strTempSaveFolder = objCloudStorage.SalGetTempSavePath();
                        string strUploadFileName = fileToUpload[0].FileName;
                        string strFileExtension = Path.GetExtension(strFileName);
                        //if (!Directory.Exists(strTempSaveFolder))
                        //{
                        //    Directory.CreateDirectory(strTempSaveFolder);
                        //}

                        //string DefalutPath = "E:\\UploadPath\\LMX";
                        string DefalutPath = "E:\\Web\\LmxYun\\LmxYun\\LmxYun\\UploadPath\\LMX";
                        string path = Path.Combine(DefalutPath, Path.GetFileName(strFileName));//"~/App_Data"
                        file.SaveAs(path);
                        strResult[0] = "success";
                        strResult[1] = strFileName;
                        //strResult[2] = strFileRevisionID;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                //objLog.SalError("SalAjxfilesUpload", ex);

                strResult[0] = "failed";
            }
            return Json(new { Data = strResult });
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}