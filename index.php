<?php
    session_start();
    include_once "includes/functions.php";

	// $users_count = db_query("SELECT COUNT(id) FROM `users`; ")->fetchColumn();
	// $views_count = db_query("SELECT SUM(`views`) FROM `links`; ")->fetchColumn();
	// $links_count = db_query("SELECT COUNT(id) FROM `links`; ")->fetchColumn();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
    <link rel="stylesheet" href="style.css">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> -->

    <script type="module" src="js/script.js" defer></script>
    <title>Каталог штанц-форм</title>
</head>
<body>
    <div class="container">
      <nav class="navbar has-background-light">
        <div class="navbar-start">
          <div class="navbar-item">
            <button class="button is-primary has-text-weight-bold <?php echo ($_SESSION['auth'] ? '' : 'is-hidden');?>">Создать</button>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
          <form method="POST" action="logout.php" class=<?php echo ($_SESSION['auth'] ? '' : 'is-hidden');?>>
              <div class="field has-addons">
                  <div class="has-text-weight-bold mr-4"><?php echo ($_SESSION['username']);?></div>
                  <button class="button is-primary has-text-weight-bold" type="submit">Выйти</button>
              </div>
          </form>
          <form method="POST" action="login.php" class=<?php echo ($_SESSION['auth'] ? 'is-hidden' : '');?>>
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Логин" name="login">
              </p>
              <p class="control">
                <input class="input" type="password" placeholder="Пароль" name="pass">
              </p>
              <p class="control">
                <button class="button is-primary has-text-weight-bold" type="submit" id="button-login">Войти</button>
              </p>
            </div>
          </form>

          </div>
        </div>
      </nav>
    <section class="section">
        <div class="columns">
            <div class="column is-2 filter">
                <form class="form" id="filter">
                   
                    <div class="field" id="products">
                        <label class="label">Виды продукции</label>
                        <div class="field-wrapper-small">
                        <?php
                            $products = db_query("SELECT * FROM `products`; ");
                            while($product = $products->fetch()) {?>
                                <label class="checkbox"><input type="checkbox" id="<?php echo $product['value']?>"><?php echo $product['value']?></label>
                            <?php }; ?>
                        </div>
                        <div class="field-view-more is-size-7 has-text-info">Показать еще</div>
                    </div>
                    
                    <div class="field" id="materials">
                        <label class="label">Виды материалов</label>
                        <div class="field-wrapper-small">
                        <?php
                            $materials = db_query("SELECT * FROM `materials`; ");
                            while($material = $materials->fetch()) {?>
                                <label class="checkbox"><input type="checkbox" id="<?php echo $material['value']?>"><?php echo $material['value']?></label>
                            <?php }; ?>
                        </div>
                        <div class="field-view-more is-size-7 has-text-info">Показать еще</div>
                    </div>

                    <div class="field" id="machines">
                        <label class="label">Оборудование</label>
                        <div class="field-wrapper">
                        <?php
                            $machines = db_query("SELECT * FROM `machines`; ");
                            while($machine = $machines->fetch()) {?>
                                <label class="checkbox"><input type="checkbox" id="<?php echo $machine['value']?>"><?php echo $machine['value']?></label>
                        <?php }; ?>
                        </div>
                    </div>

                    <div class="field" id="size-width">
                        <label class="label">Размеры изделия</label>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                              <label class="label has-text-weight-normal">Длина</label>
                            </div>
                            <div class="field-body">
                              <div class="field">
                                <p class="control">
                                  <input class="input is-small" type="number" id="sizeLength">
                                </p>
                              </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                              <label class="label has-text-weight-normal">Ширина</label>
                            </div>
                            <div class="field-body">
                              <div class="field">
                                <p class="control">
                                  <input class="input is-small" type="number" id="sizeWidth">
                                </p>
                              </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                              <label class="label has-text-weight-normal">Высота</label>
                            </div>
                            <div class="field-body">
                              <div class="field">
                                <p class="control">
                                  <input class="input is-small" type="number" id="sizeHeight">
                                </p>
                              </div>
                            </div>
                        </div>
                    </div>

                    <div class="field" id="size-knife">
                        <label class="label">Размеры по ножам</label>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                              <label class="label has-text-weight-normal">Длина</label>
                            </div>
                            <div class="field-body">
                              <div class="field">
                                <p class="control">
                                  <input class="input  is-small" type="number" id="knifeSizeLength">
                                </p>
                              </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                              <label class="label has-text-weight-normal">Высота</label>
                            </div>
                            <div class="field-body">
                              <div class="field">
                                <p class="control">
                                  <input class="input  is-small" type="number" id="knifeSizeWidth">
                                </p>
                              </div>
                            </div>
                        </div>
                    </div>

                    <div class="field" id="year">
                        <label class="label">Год</label>
                        <div class="field-wrapper-small">
                        <?php for ($i=date('Y'); $i>2012; $i--) {?>
                          <label class="checkbox"><input type="checkbox" id="<?php echo $i?>"><?php echo $i?></label>
                          <?php }; ?>

                        </div>
                        <div class="field-view-more is-size-7 has-text-info">Показать еще</div>
                    </div>

                    <div class="field" >
                        <label class="label">Номер заказа</label>
                        <input type="text" class="input is-small" id="orderNum">
                    </div>

                </form>
            </div>
            <div class="column filter" id="cards-wrapper"></div>
        </div>
    </div>
    </section>

    <div class="modal" id="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="card">
              <div class="card-content">
                  <img class="modal-image" id="modal-img">
                  <div class="modal-arrow arrow-left"></div>
                  <div class="modal-arrow arrow-right"></div>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" id="modal-close"></button>
    </div>
</body>
</html>